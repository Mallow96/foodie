# Foodie 🍕

Foodie 是一個基於 **Vue 3** 構建的高性能單頁應用程式 (SPA)。本專案採用現代前端技術全家桶，並透過本地 JSON 模擬後端 API，實現了從產品瀏覽、全域狀態管理到訂單處理的完整美食電商流程。

GitHub Page: https://mallow96.github.io/foodie/#/

---

## 🌟 專案核心特色

* **Vue 3 (SFC)**：利用最新版的 Composition API 與 Script Setup 語法，構建高效且易於維護的組件。
* **全域狀態管理 (Pinia)**：
    * 使用 `foodie_store.js` 集中管理產品、訂單與使用者偏好。
    * **資料持久化**：整合 `pinia-plugin-persistedstate`，確保重新整理頁面後，購物車或使用者狀態不會遺失。
* **模擬後端環境 (Mock API)**：
    * 透過 **Axios** 非同步讀取 `public/` 目錄下的 JSON 檔案。
    * 具備 `products.json` (商品)、`orders.json` (訂單) 及 `coupons.json` (優惠券) 資料結構。
* **動態路由導航**：使用 **Vue Router 4** 實現流暢的頁面切換與動態參數路由。
* **響應式介面設計**：完全採用 **Bootstrap 5** 佈局，完美適配手機、平板與桌上型電腦。
* **時間格式優化**：利用 **Day.js** 處理訂單時間與日期顯示。

---

## 🛠 技術棧 (Tech Stack)

| 技術分類 | 工具名稱 | 版本 / 說明 |
| :--- | :--- | :--- |
| **核心框架** | **Vue.js 3** | 進階響應式框架 |
| **建構工具** | **Vite** | 次世代快速開發工具 |
| **狀態管理** | **Pinia 3.0** | 包含持久化插件 (Persistedstate) |
| **路由管理** | **Vue Router 4.5** | 單頁應用路由導航 |
| **資料請求** | **Axios 1.12** | 處理 JSON 資料非同步讀取 |
| **UI 框架** | **Bootstrap 5.3** | 響應式 UI 與 Bootstrap Icons |
| **工具庫** | **Day.js 1.11** | 輕量化時間處理 |

---

## 📁 專案目錄結構

```text
project foodie/
├── public/                # 模擬後端 JSON 數據
│   ├── products.json      # 食物清單
│   ├── orders.json        # 訂單紀錄
│   └── coupons.json       # 折扣碼資訊
├── src/
│   ├── assets/            # 靜態資源 (圖片、CSS)
│   ├── components/        # 可複用 UI 組件
│   ├── router/            # Vue Router 路由配置 (router.js)
│   ├── store/             # Pinia 狀態管理 (foodie_store.js)
│   └── views/             # 頁面級組件 (Home, Menu, Order...)
├── package.json           # 專案依賴與腳本
└── vite.config.js         # Vite 環境設定
