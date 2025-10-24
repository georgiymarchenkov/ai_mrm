---
tenant_id: mrm
client_id: global
project_id: platform_docs
artifact_type: process
title: 04_Documentation - Data I/O
language: ru
industry: advertising
role_apply: [all]
period: 2025-10
version: "1.0"
source_path: 05_PROCESSES/04_Documentation/Data_IO.md
effective_date: 2025-10-24
visibility: internal
security_level: medium
tags: [process, 04_documentation, data_io]
---

# 04_Documentation - Data I/O

→ [Overview](./Overview.md) | [Steps](./Process_Steps.md) | [Roles](./Roles_Responsibilities.md) | [Test](./Test_Scenario.md)

---

## 📥 INPUT

```json
{
  "media_plan_id": "MP-2025-001",
  "lines": [{...}] // 142 lines
}
```

---

## 📤 OUTPUT

### Orders

```json
{
  "order_id": "ORD-001",
  "supplier": "Яндекс",
  "lines": ["MP-001", "MP-002", ...], // 25 lines
  "total_budget": 2500000,
  "dates": ["2025-10-01", "2025-12-31"],
  "status": "signed"
}
```

### Contracts

```json
{
  "contract_id": "CNT-001",
  "order_id": "ORD-001",
  "parties": ["Client", "Agency"],
  "terms": {...},
  "status": "signed",
  "signed_at": "ISO8601"
}
```

### Invoices

```json
{
  "invoice_id": "INV-001",
  "order_id": "ORD-001",
  "amount": 2500000,
  "due_date": "ISO8601",
  "status": "paid",
  "paid_at": "ISO8601"
}
```

---

**Версия:** 2.1 | **Строк:** 42 | **Статус:** ✅


