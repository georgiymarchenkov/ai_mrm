---
tenant_id: mrm
client_id: global
project_id: platform_docs
artifact_type: guide_doc
title: RAG Service - Retrieval-Augmented Generation
language: ru
industry: advertising
role_apply: [all]
period: 2025-10
version: "1.0"
source_path: 09_DEVELOPMENT/RAG/README.md
effective_date: 2025-10-24
visibility: internal
security_level: low
tags: [development, guide]
---

# RAG Service - Retrieval-Augmented Generation

## Purpose
Единый слой поиска и контекста для всех AI-ассистентов (PM, Media, Analyst, Account). Обеспечивает извлечение релевантных знаний из репозитория и внешних источников.

---

## Architecture

1) Ingestion Pipeline
- Discover → Extract → Normalize → Chunk → Embed → Upsert → Verify
- Источники: Markdown (.md), CSV/Excel, PDF/DOCX (сконвертированные в md), API ответы
- Хранилища: S3 (оригиналы), PostgreSQL (реестр), Vector DB (векторы)

2) Retrieval API
- Input: query + filters (tenant_id, client_id, project_id, artifact_type, period, role, language)
- Process: encode → vector search (k) → re-rank (optional) → citations → return
- Output: chunks[{text, score, metadata, citation}], used_filters, latency

---

## Metadata Schema (frontmatter YAML)
```yaml
tenant_id: mrm
client_id: global
project_id: platform_docs
artifact_type: tool_doc # tool_doc|process|report|media_plan|meeting_notes|integration_spec|prompt
title: Название документа
language: ru
industry: advertising
role_apply: [media_planner, analyst]
period: 2025-10
version: "2.1"
source_path: path/to/file.md
effective_date: 2025-10-24
visibility: internal # internal|client_shared
security_level: low  # low|medium|high
tags: [reach, calculators]
```

---

## Chunking Policy
- Markdown: делить по H2/H3, 800–1200 токенов; короткие секции агрегировать до ~300 токенов
- Таблицы: нормализовать в JSON; chunk по 50–100 строк
- PDF/DOCX: конвертировать в md; сохранять структуру заголовков и подписи графиков
- Citations: `citation = { file: source_path, heading: slug, line_range: [start,end] }`

---

## Retrieval API (draft)
POST /rag/query
```json
{
  "query": "как рассчитывается эффективный охват?",
  "k": 10,
  "filters": {"tenant_id":"mrm","artifact_type":["tool_doc","prompt"],"language":"ru"},
  "rerank": true,
  "citations": true,
  "client_id": "global"
}
```

Response
```json
{
  "chunks": [
    {"text": "...", "score": 0.83, "metadata": {"artifact_type":"tool_doc","tags":["effective_reach"]}, "citation": {"file":"03_TOOLS/Effective_Reach_Calculator/Overview.md","heading":"эффективный-охват","line_range":[10,28]} }
  ],
  "used_filters": {"tenant_id":"mrm","language":"ru"},
  "latency_ms": 132
}
```

---

## Quality & Metrics
- Offline: recall@k, nDCG, RAGAS faithfulness
- Online: thumbs/edit-distance из ассистентов
- SLO: P95 retrieve < 200ms; end-to-end < 2s; freshness < 5m

---

## Operations
- Reindex: по пути/по тэгам/полный; идемпотентно (по хэшу)
- Backfill: пакетная индексация истории (батчи по 1k чанков)
- Runbook: обработка 429/5xx эмбеддингов; деградация без rerank; алерты на рост latency/падение recall

---

## Roadmap (MVP)
- v0: Chroma (dev), OpenAI embeddings, md-only, filters: tenant|artifact_type|language
- v1: Pinecone, re-rank, таблицы JSON, citations, observability
- v2: гибридный поиск (BM25+vectors), PII redaction, multi-source ingestion


