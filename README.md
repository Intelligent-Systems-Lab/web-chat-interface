<img src="./public/ISL_logo.png" alt="ISL Logo" width="200" />

# NYCU Intelligent System Lab Chat Interface

這是一個簡單的聊天介面，設計用於與多種模型進行互動。
除了與模型聊天外，還可以作為自訂 API 請求產生器，提供一個簡單的互動介面。
此專案主要是為 NYCU Intelligent System Lab 開發，並且是 open source 。

## 技術架構

- **前端**: React, Vite
- **後端**: FastAPI, Poetry
- **資料庫**: MongoDB

## 功能特色

- 支援多種聊天模式（如 OpenAI、Ollama、自訂 API）。
- 每個聊天 Session 可獨立調整設定內容。
- 提供自訂 API 請求功能，方便進行簡單的互動測試。

## 啟動方法

1. **修改環境設定檔**  
   將 `.env copy` 的內容修改為正確的設定，並將檔名改為 `.env`。

2. **啟動專案**  
   使用以下指令啟動專案：
   ```bash
   docker-compose up