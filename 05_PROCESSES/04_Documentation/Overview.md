---
tenant_id: mrm
client_id: global
project_id: platform_docs
artifact_type: process
title: 04_Documentation - Overview
language: ru
industry: advertising
role_apply: [pm, account_manager]
period: 2025-10
version: "1.0"
source_path: 05_PROCESSES/04_Documentation/Overview.md
effective_date: 2025-10-24
visibility: internal
security_level: high
tags: [documentation, process, legal]
---

# 04_Documentation - Overview

→ [Processes](../_README.md) | [Steps](./Process_Steps.md) | [Roles](./Roles_Responsibilities.md) | [Data](./Data_IO.md) | [Test](./Test_Scenario.md)

---

## 🎯 ЦЕЛЬ

Превратить медиаплан в юридические и финансовые документы: заказы, договоры, счета.

---

## ⚡ ТРИГГЕРЫ

**Старт:** Media Plan approved  
**Завершение:** Contracts signed, Invoices paid

---

## 📊 ПАРАМЕТРЫ

```yaml
Длительность: 3-5 дней
Участники: Account, PM, Legal, Finance, Client
Документов: 15-25 (orders, contracts, invoices)
```

---

## 🔄 ПРОЦЕСС

```
1. Orders Creation (1д) → Из строк медиаплана
2. Contracts (1-2д) → Legal docs
3. Invoices (1д) → Finance docs
4. Signing (1-2д) → Client signs, pays
```

---

## 📁 ВХОДЫ / ВЫХОДЫ

**IN:** [Media_Plan](../../02_ARTIFACTS/Media_Plan/)  
**OUT:** Orders, Contracts, Invoices (signed + paid)

---

## 👥 УЧАСТНИКИ

| Роль | Time |
|------|------|
| **Account** | 5-7ч |
| **PM** | 2-3ч |
| **Legal** | 3-5ч |
| **Finance** | 2-3ч |

---

## ✅ КРИТЕРИИ

- ☑ All contracts signed
- ☑ All invoices paid
- ☑ Ready for launch

---

**Версия:** 2.1 | **Строк:** 54 | **Статус:** ✅
