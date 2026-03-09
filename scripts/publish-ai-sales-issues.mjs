import fs from 'node:fs';
import { execFileSync, spawnSync } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const csvPath = process.argv[2]
  ? path.resolve(process.argv[2])
  : path.resolve(__dirname, '../docs/AI_SALES_ISSUES_IMPORT.csv');

function parseCsvLine(line) {
  const values = [];
  let current = '';
  let inQuotes = false;

  for (let index = 0; index < line.length; index += 1) {
    const char = line[index];
    const next = line[index + 1];

    if (char === '"') {
      if (inQuotes && next === '"') {
        current += '"';
        index += 1;
      } else {
        inQuotes = !inQuotes;
      }
      continue;
    }

    if (char === ',' && !inQuotes) {
      values.push(current);
      current = '';
      continue;
    }

    current += char;
  }

  values.push(current);
  return values;
}

function parseCsv(text) {
  const lines = text
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);

  if (lines.length === 0) {
    return [];
  }

  const headers = parseCsvLine(lines[0]);

  return lines.slice(1).map((line) => {
    const values = parseCsvLine(line);
    return Object.fromEntries(headers.map((header, index) => [header, values[index] ?? '']));
  });
}

function getExistingIssueTitles() {
  const json = execFileSync('gh', ['issue', 'list', '--limit', '200', '--json', 'title'], {
    encoding: 'utf8',
  });

  return new Set(JSON.parse(json).map((item) => item.title));
}

function formatBulletList(value, separator = '|') {
  if (!value.trim()) {
    return '- 无';
  }

  return value
    .split(separator)
    .map((item) => item.trim())
    .filter(Boolean)
    .map((item) => `- \`${item}\``)
    .join('\n');
}

function buildIssueBody(row) {
  return `## Summary
${row.Summary}

## Metadata
- ID: \`${row.ID}\`
- Issue Type: \`${row.IssueType}\`
- Category: \`${row.Category}\`
- Priority: \`${row.Priority}\`
- Phase: \`${row.Phase}\`
- Estimate: \`${row.EstimateDays}\` days

## Depends On
${formatBulletList(row.DependsOn)}

## Files
${formatBulletList(row.Files)}

## Acceptance Criteria
- ${row.AcceptanceCriteria}

_Source file_: \`docs/AI_SALES_ISSUES_IMPORT.csv\``;
}

function createIssue(row) {
  const labels = row.Labels.split(';').map((item) => item.trim()).filter(Boolean);
  const args = ['issue', 'create', '--title', row.Title, '--body', buildIssueBody(row)];

  for (const label of labels) {
    args.push('--label', label);
  }

  const result = spawnSync('gh', args, {
    encoding: 'utf8',
    stdio: ['ignore', 'pipe', 'pipe'],
  });

  if (result.status !== 0) {
    throw new Error(`Failed to create ${row.Title}: ${result.stderr || result.stdout}`.trim());
  }

  return result.stdout.trim();
}

const csvText = fs.readFileSync(csvPath, 'utf8');
const rows = parseCsv(csvText);
const existingTitles = getExistingIssueTitles();

if (rows.length === 0) {
  console.log('No rows found in CSV.');
  process.exit(0);
}

const created = [];
const skipped = [];

for (const row of rows) {
  if (existingTitles.has(row.Title)) {
    skipped.push(row.Title);
    continue;
  }

  const url = createIssue(row);
  created.push({ title: row.Title, url });
}

console.log(
  JSON.stringify(
    {
      csvPath,
      createdCount: created.length,
      skippedCount: skipped.length,
      created,
      skipped,
    },
    null,
    2
  )
);
