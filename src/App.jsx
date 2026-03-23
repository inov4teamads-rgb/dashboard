import { useState, useRef, useEffect } from "react";
import {INITIAL_CLIENTS,INNOVA_PLANS,BR_CITIES,DEMO_CITY_KEYS,BRAZIL_PATH,DEFAULT_SCOPE,DEFAULT_CLIENT_INFO} from "./data.js";

const THEMES = {night: {
  bg:"#000000",bg1:"#0d0d0d",bg2:"#1a1a1a",bg3:"#262626",border:"#333333",border2:"#444444",
  text:"#ffffff",muted:"#888888",muted2:"#555555",accent:"#f97316",accent2:"#ea6600",
  green:"#10b981","green-bg":"#052e1c",yellow:"#f59e0b","yellow-bg":"#1c1400",
  red:"#ef4444","red-bg":"#1c0000",},
 blue: {bg:"#03071e",bg1:"#0a1628",bg2:"#0f2040",bg3:"#162847",
  border:"#1a3a6e",border2:"#1e4a8a",text:"#e8f0fe",muted:"#5b7fba",muted2:"#2e4a7a",
  accent:"#4c8ef7",accent2:"#2563eb",green:"#34d399","green-bg":"#022c22",
  yellow:"#fbbf24","yellow-bg":"#1c1400",red:"#f87171","red-bg":"#1c0000",
 },light: {
  bg:"#ffffff",bg1:"#ffffff",bg2:"#f5f5f5",bg3:"#eeeeee",border:"#dddddd",border2:"#cccccc",
  text:"#000000",muted:"#666666",muted2:"#aaaaaa",accent:"#f97316",accent2:"#ea6600",
  green:"#059669","green-bg":"#d1fae5",yellow:"#d97706","yellow-bg":"#fef3c7",
  red:"#dc2626","red-bg":"#fee2e2",},
};

function buildStyles(t){
  var a=t.accent,a2=t.accent2,g=t.green,y=t.yellow,r=t.red,bd=t.border;
  return [
    "@import url(https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@300;400;500&display=swap);",
    "*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}",
    ":root{--bg:"+t.bg+";--bg1:"+t.bg1+";--bg2:"+t.bg2+";--bg3:"+t.bg3+";",
    " --border:"+t.border+";--border2:"+t.border2+";",
    " --text:"+t.text+";--muted:"+t.muted+";--muted2:"+t.muted2+";",
    " --accent:"+t.accent+";--accent2:"+t.accent2+";",
    " --green:"+t.green+";--green-bg:"+t["green-bg"]+";",
    " --yellow:"+t.yellow+";--yellow-bg:"+t["yellow-bg"]+";",
    " --red:"+t.red+";--red-bg:"+t["red-bg"]+";",
    " --google:#4285f4;--meta:#0082fb;",
    " --font-d:Inter,sans-serif;",
    " --font-m:JetBrains Mono,monospace;",
    "}",
    "body{background:var(--bg);color:var(--text);font-family:var(--font-d);}",
    "::-webkit-scrollbar{width:4px;height:4px}",
    "::-webkit-scrollbar-track{background:var(--bg)}",
    "::-webkit-scrollbar-thumb{background:var(--border2);border-radius:2px}",
    ".login-bg{position:fixed;inset:0;background:var(--bg);display:flex;align-items:center;justify-content:center;overflow:hidden}",
    ".login-grid{position:absolute;inset:0;background-image:linear-gradient(var(--border) 1px,transparent 1px),linear-gradient(90deg,var(--border) 1px,transparent 1px);background-size:48px 48px;opacity:.3;mask-image:radial-gradient(ellipse 80% 80% at 50% 50%,black 30%,transparent 100%)}",
    ".login-glow{position:absolute;width:600px;height:600px;background:radial-gradient(ellipse,"+t.accent+"18 0%,transparent 70%);border-radius:50%;top:50%;left:50%;transform:translate(-50%,-60%);animation:breathe 6s ease-in-out infinite}",
    "@keyframes breathe{0%,100%{transform:translate(-50%,-60%) scale(1);opacity:.6}50%{transform:translate(-50%,-60%) scale(1.15);opacity:1}}",
    ".login-card{position:relative;z-index:10;background:var(--bg1);border:1px solid var(--border2);border-radius:16px;padding:48px;width:420px;box-shadow:0 40px 80px rgba(0,0,0,.5);animation:fadeUp .5s ease}",
    "@keyframes fadeUp{from{opacity:0;transform:translateY(24px)}to{opacity:1;transform:translateY(0)}}",
    ".login-logo{display:flex;align-items:center;gap:12px;margin-bottom:40px}",
    ".logo-mark{width:40px;height:40px;background:linear-gradient(135deg,var(--accent),#6366f1);border-radius:10px;display:flex;align-items:center;justify-content:center;font-size:18px;box-shadow:0 0 20px "+t.accent+"40;overflow:hidden}",
    ".logo-text{font-family:var(--font-d);font-size:20px;font-weight:800;color:var(--text);letter-spacing:-0.5px}",
    ".logo-sub{font-size:10px;color:var(--muted);letter-spacing:1.5px;text-transform:uppercase;font-family:var(--font-m)}",
    ".login-title{font-family:var(--font-d);font-size:26px;font-weight:700;margin-bottom:8px;letter-spacing:-0.5px}",
    ".login-sub{font-size:12px;color:var(--muted);margin-bottom:32px}",
    ".field-label{font-size:10px;letter-spacing:1.5px;text-transform:uppercase;color:var(--muted);margin-bottom:8px;display:block;font-weight:600}",
    ".field-input{width:100%;background:var(--bg2);border:1px solid var(--border2);border-radius:8px;color:var(--text);padding:12px 16px;font-family:var(--font-d);font-size:13px;transition:border-color .2s,box-shadow .2s;outline:none;margin-bottom:20px}",
    ".field-input:focus{border-color:var(--accent);box-shadow:0 0 0 3px "+t.accent+"18}",
    ".btn-primary{width:100%;background:var(--accent);border:none;color:#fff;padding:14px;border-radius:8px;cursor:pointer;font-family:var(--font-d);font-size:14px;font-weight:700;letter-spacing:.5px;transition:all .2s}",
    ".btn-primary:hover{background:var(--accent2);transform:translateY(-1px);box-shadow:0 8px 20px "+t.accent+"40}",
    ".app{display:flex;min-height:100vh}",
    ".sidebar{width:224px;min-height:100vh;background:var(--bg1);border-right:1px solid var(--border);display:flex;flex-direction:column;position:fixed;left:0;top:0;bottom:0;z-index:50;transition:width .25s ease}",
    ".sidebar.collapsed{width:60px}",
    ".sidebar.collapsed .nav-item span:not(.nav-icon),.sidebar.collapsed .user-name,.sidebar.collapsed .user-role{display:none}",
    ".sidebar.collapsed .nav-item{justify-content:center;padding:10px 0}",
    ".sidebar.collapsed .sidebar-logo{justify-content:center;padding:16px 0}",
    ".sidebar.collapsed .user-chip{justify-content:center;padding:10px 0}",
    ".sidebar-collapse-btn{position:absolute;right:-14px;top:72px;width:28px;height:28px;border-radius:50%;background:var(--bg2);border:1px solid var(--border2);cursor:pointer;display:flex;align-items:center;justify-content:center;font-size:12px;color:var(--muted);transition:all .2s;z-index:60}",
    ".sidebar-collapse-btn:hover{background:var(--accent);color:#fff;border-color:var(--accent)}",
    ".main{margin-left:224px;flex:1;min-height:100vh;transition:margin-left .25s ease}",
    ".main.sidebar-collapsed{margin-left:60px}",
    ".sidebar-logo{padding:20px 16px;border-bottom:1px solid var(--border);display:flex;align-items:center;gap:10px;min-height:64px}",
    ".sidebar-logo-mark{width:34px;height:34px;background:linear-gradient(135deg,var(--accent),#6366f1);border-radius:8px;display:flex;align-items:center;justify-content:center;font-size:15px;flex-shrink:0;box-shadow:0 0 16px "+t.accent+"30;overflow:hidden}",
    ".sidebar-name{font-family:var(--font-d);font-size:15px;font-weight:800;color:var(--text);line-height:1;letter-spacing:-0.3px}",
    ".sidebar-tagline{font-size:9px;color:var(--muted);letter-spacing:1px;margin-top:2px;font-family:var(--font-m)}",
    ".nav-section{padding:16px 10px 6px}",
    ".nav-label{font-size:10px;color:var(--muted2);letter-spacing:1.5px;text-transform:uppercase;padding:0 8px;margin-bottom:4px;font-weight:600}",
    ".nav-item{display:flex;align-items:center;gap:9px;padding:8px 10px;border-radius:8px;cursor:pointer;font-size:13px;color:var(--muted);transition:all .15s;border:1px solid transparent;margin-bottom:1px;font-family:var(--font-d);font-weight:500}",
    ".nav-item:hover{background:var(--bg2);color:var(--text)}",
    ".nav-item.active{background:"+t.accent+"18;color:var(--accent);border-color:"+t.accent+"30}",
    ".nav-icon{font-size:15px;width:20px;text-align:center;flex-shrink:0}",
    ".sidebar-footer{margin-top:auto;padding:14px 10px;border-top:1px solid var(--border)}",
    ".user-chip{display:flex;align-items:center;gap:10px;padding:10px 10px;border-radius:8px;background:var(--bg2);cursor:pointer;transition:background .15s}",
    ".user-chip:hover{background:var(--bg3)}",
    ".user-avatar{width:30px;height:30px;border-radius:50%;background:linear-gradient(135deg,var(--accent),#6366f1);display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:700;color:#fff;flex-shrink:0;font-family:var(--font-d)}",
    ".user-name{font-size:12px;color:var(--text);font-family:var(--font-d);font-weight:600}",
    ".user-role{font-size:9px;color:var(--muted);letter-spacing:.5px;text-transform:uppercase}",
    ".topbar{background:var(--bg1);border-bottom:1px solid var(--border);padding:0 28px;height:60px;display:flex;align-items:center;justify-content:space-between;position:sticky;top:0;z-index:40}",
    ".page-title{font-family:var(--font-d);font-size:17px;font-weight:700;letter-spacing:-0.3px}",
    ".page-sub{font-size:11px;color:var(--muted)}",
    ".topbar-right{display:flex;gap:8px;align-items:center}",
    ".btn-sm{background:var(--bg2);border:1px solid var(--border2);color:var(--text);padding:7px 14px;border-radius:7px;cursor:pointer;font-family:var(--font-d);font-size:12px;font-weight:500;transition:all .15s}",
    ".btn-sm:hover{border-color:var(--accent);color:var(--accent)}",
    ".btn-accent{background:var(--accent);border:1px solid var(--accent);color:#fff;padding:7px 16px;border-radius:7px;cursor:pointer;font-family:var(--font-d);font-size:12px;font-weight:600;transition:all .2s}",
    ".btn-accent:hover{background:var(--accent2);transform:translateY(-1px);box-shadow:0 4px 12px "+t.accent+"40}",
    ".content{padding:24px 28px}",
    ".stats-row{display:grid;grid-template-columns:repeat(4,1fr);gap:14px;margin-bottom:24px}",
    ".stat-card{background:var(--bg1);border:1px solid var(--border);border-radius:12px;padding:18px 20px;position:relative;overflow:hidden;transition:border-color .2s,transform .2s;animation:fadeUp .4s ease both}",
    ".stat-card:hover{border-color:var(--border2);transform:translateY(-2px)}",
    ".stat-card::before{content:'';position:absolute;top:0;left:0;right:0;height:2px;background:var(--accent-line,var(--accent));border-radius:12px 12px 0 0}",
    ".stat-label{font-size:10px;color:var(--muted);letter-spacing:1px;text-transform:uppercase;margin-bottom:10px;font-weight:600}",
    ".stat-value{font-family:var(--font-d);font-size:28px;font-weight:800;line-height:1;letter-spacing:-1px}",
    ".stat-sub{font-size:11px;color:var(--muted);margin-top:6px}",
    ".filter-bar{display:flex;gap:8px;align-items:center;margin-bottom:20px;flex-wrap:wrap}",
    ".filter-label{font-size:11px;color:var(--muted);letter-spacing:.5px;text-transform:uppercase;margin-right:4px;font-weight:600}",
    ".filter-btn{background:var(--bg2);border:1px solid var(--border);color:var(--muted);padding:6px 14px;border-radius:20px;cursor:pointer;font-family:var(--font-d);font-size:12px;font-weight:500;transition:all .15s}",
    ".filter-btn:hover{border-color:var(--border2);color:var(--text)}",
    ".filter-btn.active{background:"+t.accent+"18;border-color:"+t.accent+"60;color:var(--accent)}",
    ".week-section{background:var(--bg1);border:1px solid var(--border);border-radius:14px;overflow:hidden;margin-bottom:20px}",
    ".week-section-header{display:flex;align-items:center;justify-content:space-between;padding:14px 20px;border-bottom:1px solid var(--border);background:var(--bg2)}",
    ".manager-badge{display:flex;align-items:center;gap:8px;font-family:var(--font-d);font-size:13px;font-weight:700;color:var(--text)}",
    ".manager-dot{width:8px;height:8px;border-radius:50%;background:var(--accent)}",
    ".table-header{display:grid;grid-template-columns:200px 100px repeat(7,1fr) 64px 80px 88px;gap:4px;padding:10px 16px;background:var(--bg3);border-bottom:1px solid var(--border)}",
    ".th{font-size:10px;color:var(--muted);letter-spacing:.5px;text-transform:uppercase;text-align:center;font-weight:600}",
    ".th.left{text-align:left}",
    ".client-group{border-bottom:1px solid var(--border)}",
    ".client-group:last-child{border-bottom:none}",
    ".client-group-name-row{display:grid;grid-template-columns:200px 100px repeat(7,1fr) 64px 80px 88px;gap:4px;padding:8px 16px 2px;align-items:center}",
    ".client-group-name{font-family:var(--font-d);font-size:12px;font-weight:700;color:var(--text)}",
    ".product-chip{display:inline-flex;align-items:center;gap:5px;font-size:10px;color:var(--muted);background:var(--bg3);border:1px solid var(--border);padding:3px 8px;border-radius:4px;cursor:pointer;transition:all .15s;white-space:nowrap;overflow:hidden;max-width:190px;text-overflow:ellipsis;font-family:var(--font-d);font-weight:500}",
    ".product-chip:hover{border-color:var(--accent);color:var(--accent)}",
    ".platform-row{display:grid;grid-template-columns:200px 100px repeat(7,1fr) 64px 80px 88px;gap:4px;padding:3px 16px;align-items:center}",
    ".platform-row:last-child{padding-bottom:8px}",
    ".platform-badge{display:inline-flex;align-items:center;gap:4px;font-size:9px;font-weight:700;letter-spacing:.2px;padding:3px 7px;border-radius:4px;text-transform:uppercase;white-space:nowrap;font-family:var(--font-d);max-width:96px}",
    ".platform-badge.google{background:rgba(66,133,244,.12);color:#4285f4;border:1px solid rgba(66,133,244,.25)}",
    ".platform-badge.meta{background:rgba(0,130,251,.12);color:#0082fb;border:1px solid rgba(0,130,251,.25)}",
    ".day-cell{height:48px;border-radius:5px;border:none;cursor:pointer;font-family:var(--font-d);transition:all .15s;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:1px;width:100%}",
    ".day-cell:hover{filter:brightness(1.2);transform:scale(1.06);z-index:2;position:relative}",
    ".day-cell.empty{background:var(--bg3);border:1px dashed var(--border);color:var(--muted2)}",
    ".day-cell.empty:hover{border-color:var(--border2);color:var(--muted)}",
    ".day-cell.green{background:var(--green-bg);border:1px solid "+t.green+"40;color:var(--green)}",
    ".day-cell.yellow{background:var(--yellow-bg);border:1px solid "+t.yellow+"40;color:var(--yellow)}",
    ".day-cell.red{background:var(--red-bg);border:1px solid "+t.red+"40;color:var(--red)}",
    ".cell-leads{font-size:14px;font-weight:700;line-height:1}",
    ".cell-gasto{font-size:9px;opacity:.75}",
    ".cell-cpl{font-size:8px;opacity:.6}",
    ".cell-plus{font-size:16px;opacity:.25}",
    ".total-leads{font-family:var(--font-d);font-size:16px;font-weight:800;text-align:center;color:var(--accent)}",
    ".total-gasto{font-size:10px;text-align:center;color:var(--muted)}",
    ".total-cpl{text-align:center;border-radius:5px;padding:5px 2px;font-size:11px;font-weight:600}",
    ".modal-overlay{position:fixed;inset:0;background:rgba(0,0,0,.7);display:flex;align-items:center;justify-content:center;z-index:200;backdrop-filter:blur(4px);animation:fadeIn .15s ease}",
    "@keyframes fadeIn{from{opacity:0}to{opacity:1}}",
    ".modal{background:var(--bg1);border:1px solid var(--border2);border-radius:16px;padding:28px;width:420px;box-shadow:0 40px 80px rgba(0,0,0,.5);animation:fadeUp .2s ease}",
    ".modal-lg{width:600px;max-height:85vh;overflow-y:auto}",
    ".modal-title{font-family:var(--font-d);font-size:18px;font-weight:700;margin-bottom:4px;letter-spacing:-0.3px}",
    ".modal-sub{font-size:12px;color:var(--muted);margin-bottom:20px}",
    ".summary-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(240px,1fr));gap:14px}",
    ".summary-card{background:var(--bg1);border-radius:12px;padding:18px;border:1px solid var(--border);position:relative;overflow:hidden;transition:all .2s;animation:fadeUp .3s ease both}",
    ".summary-card:hover{transform:translateY(-3px);box-shadow:0 12px 32px rgba(0,0,0,.2)}",
    ".summary-card-accent{position:absolute;top:0;left:0;bottom:0;width:3px}",
    ".summary-card-name{font-family:var(--font-d);font-size:14px;font-weight:700;margin-bottom:2px}",
    ".summary-card-manager{font-size:11px;color:var(--muted);margin-bottom:14px}",
    ".platform-block{margin-bottom:8px;padding:10px 12px;border-radius:8px;background:var(--bg2)}",
    ".platform-block-header{display:flex;align-items:center;justify-content:space-between;margin-bottom:8px}",
    ".metrics-row{display:flex;gap:16px}",
    ".metric-val{font-family:var(--font-d);font-size:18px;font-weight:800;line-height:1}",
    ".metric-lbl{font-size:9px;color:var(--muted);letter-spacing:1px;text-transform:uppercase;margin-top:1px;font-weight:600}",
    ".alert-tags{display:flex;flex-wrap:wrap;gap:4px;margin-top:10px}",
    ".alert-tag{font-size:9px;letter-spacing:.5px;text-transform:uppercase;padding:3px 8px;border-radius:4px;background:"+t.red+"18;color:var(--red);border:1px solid "+t.red+"30;font-weight:600}",
    ".history-week{background:var(--bg1);border:1px solid var(--border);border-radius:12px;overflow:hidden;margin-bottom:16px}",
    ".history-week-header{padding:14px 20px;background:var(--bg2);border-bottom:1px solid var(--border);display:flex;align-items:center;justify-content:space-between;font-family:var(--font-d);font-size:14px;font-weight:700}",
    ".dash-filter-bar{display:flex;gap:8px;align-items:center;margin-bottom:20px;flex-wrap:wrap}",
    ".date-btn{background:var(--bg2);border:1px solid var(--border);color:var(--muted);padding:7px 14px;border-radius:8px;cursor:pointer;font-family:var(--font-d);font-size:12px;font-weight:500;transition:all .15s}",
    ".date-btn.active{background:"+t.accent+"18;border-color:"+t.accent+"60;color:var(--accent)}",
    ".date-btn:hover{border-color:var(--border2);color:var(--text)}",
    ".dash-table-wrap{background:var(--bg1);border:1px solid var(--border);border-radius:14px;overflow:hidden;margin-bottom:20px}",
    ".dash-table-header{padding:14px 20px;background:var(--bg2);border-bottom:1px solid var(--border);display:flex;align-items:center;justify-content:space-between}",
    ".dash-table{width:100%;border-collapse:collapse}",
    ".dash-th{font-size:10px;color:var(--muted);letter-spacing:.5px;text-transform:uppercase;padding:10px 14px;text-align:right;border-bottom:1px solid var(--border);white-space:nowrap;font-weight:600}",
    ".dash-th.left{text-align:left}",
    ".dash-td{font-size:12px;color:var(--text);padding:10px 14px;text-align:right;border-bottom:1px solid "+t.border+"80;font-family:var(--font-m)}",
    ".dash-td.left{text-align:left;font-family:var(--font-d);font-weight:600;font-size:12px}",
    ".dash-tr:hover td{background:"+t.accent+"06}",
    ".dash-tr:last-child td{border-bottom:none}",
    ".api-badge{display:inline-flex;align-items:center;gap:5px;font-size:10px;padding:3px 10px;border-radius:4px;font-family:var(--font-d);font-weight:600}",
    ".api-badge.sim{background:"+t.yellow+"18;color:var(--yellow);border:1px solid "+t.yellow+"30}",
    ".api-badge.live{background:"+t.green+"18;color:var(--green);border:1px solid "+t.green+"30}",
    ".budget-input{background:var(--bg3);border:1px solid var(--border);border-radius:4px;color:var(--text);padding:4px 8px;font-family:var(--font-m);font-size:11px;width:90px;outline:none;text-align:right;transition:border-color .15s}",
    ".budget-input:focus{border-color:var(--accent)}",
    ".cpl-cell{display:inline-block;padding:3px 8px;border-radius:4px;font-size:11px;font-weight:700}",
    ".products-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(300px,1fr));gap:16px}",
    ".product-card{background:var(--bg1);border:1px solid var(--border);border-radius:14px;overflow:hidden;transition:all .2s;animation:fadeUp .3s ease both}",
    ".product-card:hover{border-color:var(--border2);transform:translateY(-2px)}",
    ".product-card-header{padding:14px 18px;background:var(--bg2);border-bottom:1px solid var(--border);display:flex;align-items:center;justify-content:space-between}",
    ".product-card-name{font-family:var(--font-d);font-size:13px;font-weight:700}",
    ".product-card-body{padding:14px 18px}",
    ".scope-row{display:flex;align-items:flex-start;gap:10px;padding:7px 0;border-bottom:1px solid "+t.border+"80;font-size:11px}",
    ".scope-row:last-child{border-bottom:none}",
    ".scope-label{color:var(--muted);min-width:120px;font-size:10px;font-weight:600;letter-spacing:.3px}",
    ".scope-value{color:var(--text);flex:1}",
    ".scope-tag{display:inline-block;font-size:9px;padding:2px 7px;border-radius:3px;margin:2px;font-family:var(--font-d);font-weight:600}",
    ".scope-tag.included{background:"+t.green+"18;color:var(--green);border:1px solid "+t.green+"30}",
    ".scope-tag.excluded{background:"+t.red+"18;color:var(--red);border:1px solid "+t.red+"30}",
    ".scope-tag.platform{background:"+t.accent+"18;color:var(--accent);border:1px solid "+t.accent+"30}",
    ".edit-scope-btn{font-size:11px;background:none;border:1px solid var(--border2);color:var(--muted);padding:4px 10px;border-radius:5px;cursor:pointer;font-family:var(--font-d);font-weight:500;transition:all .15s}",
    ".edit-scope-btn:hover{border-color:var(--accent);color:var(--accent)}",
    ".settings-section{background:var(--bg1);border:1px solid var(--border);border-radius:14px;overflow:hidden;margin-bottom:20px}",
    ".settings-section-header{padding:14px 20px;background:var(--bg2);border-bottom:1px solid var(--border);font-family:var(--font-d);font-size:13px;font-weight:700;display:flex;align-items:center;gap:8px}",
    ".settings-body{padding:20px}",
    ".theme-btn{padding:12px 20px;border-radius:10px;border:2px solid var(--border);cursor:pointer;font-family:var(--font-d);font-size:12px;font-weight:600;transition:all .2s;display:flex;flex-direction:column;align-items:center;gap:6px;min-width:100px}",
    ".theme-btn.active{border-color:var(--accent);background:"+t.accent+"12}",
    ".conn-card{background:var(--bg2);border:1px solid var(--border);border-radius:10px;padding:16px 20px;display:flex;align-items:center;justify-content:space-between;margin-bottom:10px}",
    ".conn-status{display:flex;align-items:center;gap:6px;font-size:11px;font-weight:600}",
    ".conn-dot{width:8px;height:8px;border-radius:50%}",
    ".user-row{display:flex;align-items:center;justify-content:space-between;padding:12px 0;border-bottom:1px solid "+t.border+"80}",
    ".user-row:last-child{border-bottom:none}",
    ".map-container{background:var(--bg1);border:1px solid var(--border);border-radius:14px;overflow:hidden;position:relative}",
    ".map-svg-wrap{position:relative;width:100%;background:var(--bg2)}",
    ".map-pin{cursor:pointer;transition:transform .2s}",
    ".map-pin:hover{transform:scale(1.3)}",
    ".map-tooltip{position:absolute;background:var(--bg1);border:1px solid var(--border2);border-radius:10px;padding:12px 14px;pointer-events:none;z-index:100;min-width:180px;box-shadow:0 8px 24px rgba(0,0,0,.3);animation:fadeUp .15s ease}",
    ".toast{position:fixed;top:20px;right:20px;z-index:500;background:var(--bg1);border:1px solid var(--border2);border-radius:10px;padding:14px 18px;min-width:240px;display:flex;align-items:center;gap:12px;box-shadow:0 12px 32px rgba(0,0,0,.3);animation:slideToast .3s ease}",
    "@keyframes slideToast{from{opacity:0;transform:translateX(20px)}to{opacity:1;transform:translateX(0)}}",
    ".legend-bar{position:fixed;bottom:20px;left:50%;transform:translateX(-50%);background:var(--bg1);border:1px solid var(--border2);border-radius:30px;padding:8px 20px;display:flex;gap:20px;align-items:center;font-size:11px;font-weight:500;box-shadow:0 8px 24px rgba(0,0,0,.3);z-index:30}",
    ".legend-dot{width:8px;height:8px;border-radius:50%;display:inline-block;margin-right:5px}",
    "textarea{resize:vertical;min-height:80px;font-family:var(--font-d)}",
    "select.field-input{cursor:pointer}",
  ].join("\n");
}

const USERS = [
 {id:1,username:"admin",  password:"123",    name:"Admin",  role:"Admin",             manager:null,    photoUrl:""},
 {id:2,username:"brenda", password:"brenda", name:"Brenda", role:"Gestor de Tráfego", manager:"BRENDA",photoUrl:""},
 {id:3,username:"gustavo",password:"gustavo",name:"Gustavo",role:"Gestor de Tráfego", manager:"GUSTAVO",photoUrl:""},];

const DAYS = ["DOM","SEG","TER","QUA","QUI","SEX","SAB"];
const P_LABEL = {google:"Google Ads",meta:"Meta Ads"};
const P_ICON  = {google:"",meta:""};
const CS = {green: {accent:"#10b981",bg:"rgba(16,185,129,.08)",border:"rgba(16,185,129,.25)"},
 yellow:{accent:"#f59e0b",bg:"rgba(245,158,11,.08)", border:"rgba(245,158,11,.25)"},
 red:   {accent:"#ef4444",bg:"rgba(239,68,68,.08)",  border:"rgba(239,68,68,.25)"},empty: {accent:"#2e3f58",bg:"transparent",          border:"#1e2d45"},
};

function getWeekDates(offsetWeeks=0, customStart=null, customEnd=null){if(customStart&&customEnd){

  const start=new Date(customStart);
  const end=new Date(customEnd);
  const diffDays=Math.min(6,Math.round((end - start) / (1000 * 60 * 60 * 24)));
  return Array.from({length:diffDays+1},(_,i)=>{const d=new Date(start); d.setDate(start.getDate()+i);
   return d.toLocaleDateString("pt-BR",{day:"2-digit",month:"2-digit"});
  });
 }
 const today=new Date(2026,2,12);
 const sun=new Date(today);
 sun.setDate(today.getDate()-today.getDay()+(offsetWeeks*7));
 return DAYS.map((_,i)=>{const d=new Date(sun);d.setDate(sun.getDate()+i);return d.toLocaleDateString("pt-BR",{day:"2-digit",month:"2-digit"});});
}

function cc(leads,gasto,meta,platform){const l=parseFloat(leads)||0,g=parseFloat(gasto)||0;
 if(!l&&!g) return "empty";
 if(l===0&&g>0) return "red";
 const cpl=g / l;
 if(platform==="meta"){if(cpl<=9)  return "green";
  if(cpl<=12) return "yellow";
  return "red";
 }
 if(platform==="google"){if(cpl<=35) return "green";
  if(cpl<=40) return "yellow";
  return "red";
 }

 if(cpl<=meta*0.85) return "green";
 if(cpl<=meta*1.1)  return "yellow";
 return "red";
}

function calcWeek(pData){let l=0,g=0;
 DAYS.forEach(d=>{l+=parseFloat(pData?.[d]?.leads)||0;g+=parseFloat(pData?.[d]?.gasto)||0;});
 return{leads:l,gasto:g,cpl:l?(g / l):0};
}

function initData(clients){const d={};
 clients.forEach(c=>{d[c.id]={};c.platforms.forEach(({p})=>{d[c.id][p]={};DAYS.forEach(day=>{d[c.id][p][day]={leads:"",gasto:""};});});});
 return d;
}

function simData(clientId,platform,dateRange){const seed=(clientId*31+platform.length*17)%100;
 const base={leads:Math.floor(8+seed*.4),gasto:Math.floor(400+seed*18),cliques:Math.floor(90+seed*6),impressoes:Math.floor(3000+seed*200)};
 const mult=dateRange==="hoje"?.15:dateRange==="ontem"?.18:dateRange==="semana"?1:dateRange==="mes"?4.2:1;
 const l=Math.max(1,Math.floor(base.leads*mult+(Math.random()-.5)*3));
 const g=Math.floor(base.gasto*mult+(Math.random()-.5)*50);
 const cl=Math.floor(base.cliques*mult);
 const imp=Math.floor(base.impressoes*mult);
 return{leads:l,gasto:g,cpl:l?(g / l):0,cpc:cl?(g / cl):0,ctr:imp?(cl / imp*100):0,cliques:cl,impressoes:imp};
}

function ProductModal({client,onClose,onSave}){const [form,setForm]=useState({...client.scope});
 const [extraInput,setExtraInput]=useState("");
 function f(k,v){setForm(p=>({...p,[k]:v}));}
 return(
  <div className="modal-overlay" onClick={onClose}>
   <div className="modal modal-lg" onClick={e=>e.stopPropagation()}>
    <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:4}}>
     <div className="modal-title">Escopo do Contrato</div>
     <div style={{display:"flex",gap:6}}>
      {client.platforms.map(({p})=><span key={p} className={`platform-badge ${p}`}>{P_ICON[p]} {P_LABEL[p]}</span>)}
     </div>
    </div>
    <div className="modal-sub">{client.name} · {client.manager}</div>

    <label className="field-label">Plataformas Contratadas</label>
    <div style={{display:"flex",gap:8,marginBottom:20,flexWrap:"wrap"}}>
     {["Google Ads","Meta Ads","Google Analytics","Landing Page"].map(opt=>(
      <button key={opt} onClick={()=>{const has=form.plataformas.includes(opt);f("plataformas",has?form.plataformas.filter(x=>x!==opt):[...form.plataformas,opt]);}}
       style={{padding:"6px 12px",borderRadius:6,border:"1px solid",cursor:"pointer",fontSize:11,fontFamily:"var(--font-m)",transition:"all .15s",
        background:form.plataformas.includes(opt)?"rgba(59,130,246,.12)":"var(--bg2)",
        borderColor:form.plataformas.includes(opt)?"rgba(59,130,246,.4)":"var(--border2)",
        color:form.plataformas.includes(opt)?"var(--accent)":"var(--muted)"}}>
       {opt}
      </button>
     ))}
    </div>

    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16}}>
     <div>
      <label className="field-label">Budget Mensal Acordado</label>
      <input className="field-input" value={form.budget} placeholder="Ex: R$ 3.000"
       onChange={e=>f("budget",e.target.value)}/>
     </div>
     <div>
      <label className="field-label">Número de Campanhas</label>
      <input className="field-input" value={form.campanhas} placeholder="Ex: 3 Google/2 Meta"
       onChange={e=>f("campanhas",e.target.value)}/>
     </div>
     <div>
      <label className="field-label">Criativos / Mês</label>
      <input className="field-input" value={form.criativos} placeholder="Ex: 4 criativos/mês"
       onChange={e=>f("criativos",e.target.value)}/>
     </div>
     <div>
      <label className="field-label">Relatórios</label>
      <select className="field-input" value={form.relatorios} onChange={e=>f("relatorios",e.target.value)}>
       {["Semanal","Quinzenal","Mensal","Não incluso"].map(o=><option key={o}>{o}</option>)}
      </select>
     </div>
    </div>

    <label className="field-label" style={{marginTop:4}}>Serviços Extras / Add-ons Contratados</label>
    <div style={{display:"flex",gap:8,marginBottom:12,flexWrap:"wrap"}}>
     {form.extras.map(e=>(
      <span 
        key={e} 
        style={{fontSize:10,background:"rgba(16,185,129,.1)",color:"var(--green)",border:"1px solid rgba(16,185,129,.2)",padding:"3px 10px",borderRadius:4,display:"flex",alignItems:"center",gap:6}}>
       {e}
       <button onClick={()=>f("extras",form.extras.filter(x=>x!==e))} style={{background:"none",border:"none",color:"var(--green)",cursor:"pointer",fontSize:12,lineHeight:1}}>×</button>
      </span>
     ))}
    </div>
    <div style={{display:"flex",gap:8,marginBottom:20}}>
     <input className="field-input" style={{marginBottom:0,flex:1}} value={extraInput} placeholder="Ex: Remarketing, WhatsApp..."
      onChange={e=>setExtraInput(e.target.value)}
      onKeyDown={e=>{if(e.key==="Enter"&&extraInput.trim()){f("extras",[...form.extras,extraInput.trim()]);setExtraInput("");}}}/>
     <button className="btn-sm" onClick={()=>{if(extraInput.trim()){f("extras",[...form.extras,extraInput.trim()]);setExtraInput("");}}} style={{whiteSpace:"nowrap"}}>+ Add</button>
    </div>

    <label className="field-label">Observações / Restrições</label>
    <textarea className="field-input" value={form.observacoes} placeholder="Anotar o que NÃO está incluso, limitações, contexto do cliente..."
     onChange={e=>f("observacoes",e.target.value)}/>

    <div style={{display:"flex",gap:10,marginTop:8}}>
     <button className="btn-accent" style={{flex:1}} onClick={()=>{onSave(form);onClose();}}>Salvar Escopo</button>
     <button className="btn-sm" style={{flex:1}} onClick={onClose}>Cancelar</button>
    </div>
   </div>
  </div>
 );
}



export default function App(){const [screen,setScreen]=useState("login");
 const [loggedUser,setLoggedUser]=useState(null);
 const [loginForm,setLoginForm]=useState({user:"",pass:""});
 const [loginError,setLoginError]=useState("");
 const [view,setView]=useState("week");
 const [clients,setClients]=useState(INITIAL_CLIENTS);
 const [weekData,setWeekData]=useState(()=>initData(INITIAL_CLIENTS));
 const [selMgr,setSelMgr]=useState("TODOS");
 const [editing,setEditing]=useState(null);
 const [tempVal,setTempVal]=useState({leads:"",gasto:""});
 const [toast,setToast]=useState(null);
 const [history,setHistory]=useState({});
 const [productModal,setProductModal]=useState(null);
 const [selectedPlan,setSelectedPlan]=useState(null);
 const [dateRange,setDateRange]=useState("semana");
 const [customDateFrom,setCustomDateFrom]=useState("");
 const [customDateTo,setCustomDateTo]=useState("");
 const [budgets,setBudgets]=useState({});
 const [sortCol,setSortCol]=useState("cpl");
 const [sortDir,setSortDir]=useState("desc");

 const [theme,setTheme]=useState("night");
 const [logoUrl,setLogoUrl]=useState("");
 const [logoUrlDark,setLogoUrlDark]=useState("");
 const [brandName,setBrandName]=useState("Traffic Board");
 const [brandSub,setBrandSub]=useState("Performance Monitor");

 const [settingsTab,setSettingsTab]=useState("aparencia");

 const [mapTooltip,setMapTooltip]=useState(null);
 const [mapClients,setMapClients]=useState(INITIAL_CLIENTS.map(c=>({...c,city:getDemoCity(c.id)}))
 );
 const [addMapModal,setAddMapModal]=useState(false);
 const [mapForm,setMapForm]=useState({clientId:"",city:""});

 const [usersState,setUsersState]=useState(USERS.map(u=>({...u})));
 const [addUserModal,setAddUserModal]=useState(false);
 const [newUserForm,setNewUserForm]=useState({username:"",password:"",name:"",role:"GESTOR",manager:""});
 const [sidebarOpen,setSidebarOpen]=useState(true);
 const [showLogout,setShowLogout]=useState(false);
 const [selectedUserForClients,setSelectedUserForClients]=useState(null);
 const [clientsView,setClientsView]=useState("list");
 const [selectedClientEdit,setSelectedClientEdit]=useState(null);

 const [gcalId,setGcalId]=useState(""); // Google Calendar ID configured in settings
 const [agendaView,setAgendaView]=useState("week"); // "week"|"month"|"list"
 const [agendaDate,setAgendaDate]=useState(new Date().toISOString().split("T")[0]);
 const [agendaEvents,setAgendaEvents]=useState([]); // manual events before real integration
 const [agendaModal,setAgendaModal]=useState(false);
 const [agendaForm,setAgendaForm]=useState({title:"",client:"",date:"",time:"",duration:"60",link:"",notes:""});

 const [clientResults,setClientResults]=useState(()=>{const r={};
  INITIAL_CLIENTS.forEach(c=>{ r[c.id]={months:{},entryDate:""} });
  return r;
 });
 const [selectedResultClient,setSelectedResultClient]=useState(null);
 const [resultEditMonth,setResultEditMonth]=useState(null);
 const [resultMonthForm,setResultMonthForm]=useState({});
 const [resultEntryDate,setResultEntryDate]=useState({});
 const [expandedManagers,setExpandedManagers]=useState({});

 const [weekOffset,setWeekOffset]=useState(0);
 const [weekCustomMode,setWeekCustomMode]=useState(false);
 const [weekCustomStart,setWeekCustomStart]=useState("");
 const [weekCustomEnd,setWeekCustomEnd]=useState("");
 const [summaryClientId,setSummaryClientId]=useState("");
 const [summaryWeeksCount,setSummaryWeeksCount]=useState(5);
 const weekDates=weekCustomMode&&weekCustomStart&&weekCustomEnd
  ?getWeekDates(0,weekCustomStart,weekCustomEnd)
  :getWeekDates(weekOffset);
 const gastoRef=useRef(null);
 const T=THEMES[theme]||THEMES.night;
 const STYLES=buildStyles(T);

 const managers=[...new Set(clients.map(c=>c.manager))];
 const filtered=clients.filter(c=>selMgr==="TODOS"||c.manager===selMgr);

 function showToast(icon,msg){setToast({icon,msg});setTimeout(()=>setToast(null),3000);}
 function doLogin(){const u=usersState.find(u=>u.username===loginForm.user&&u.password===loginForm.pass);
  if(u){setLoggedUser(u);setSelMgr(u.manager||"TODOS");setScreen("app");}
  else setLoginError("Usuário ou senha incorretos");
 }
 function openEdit(clientId,platform,day){const d=weekData[clientId]?.[platform]?.[day]||{};
  setEditing({clientId,platform,day});
  setTempVal({leads:d.leads||"",gasto:d.gasto||""});
 }
 function saveCell(){if(!editing)return;
  const{clientId,platform,day}=editing;
  setWeekData(prev=>{
   const updated={...prev,[clientId]:{...prev[clientId],[platform]:{...prev[clientId][platform],[day]:{leads:tempVal.leads,gasto:tempVal.gasto,manual:true,savedAt:new Date().toISOString()}}}};
   const key=weekDates[0];
   setHistory(h=>({...h,[key]:{data:JSON.parse(JSON.stringify(updated)),dates:[...weekDates],weekOffset}}));
   return updated;
  });
  setEditing(null);
  showToast("✏️","Lançamento salvo no histórico");
 }
 function saveWeek(){const key=weekDates[0]+" → "+weekDates[5];
  setHistory(p=>({...p,[key]:{data:JSON.parse(JSON.stringify(weekData)),dates:[...weekDates]}}));
  showToast("💾","Semana salva no histórico");
 }
 function saveScope(clientId,scope){setClients(prev=>prev.map(c=>c.id===clientId?{...c,scope}:c));
  showToast("✅","Escopo atualizado");
 }

 const allLeads=clients.flatMap(c=>c.platforms.map(({p})=>calcWeek(weekData[c.id]?.[p]).leads)).reduce((a,b)=>a+b,0);
 const allGasto=clients.flatMap(c=>c.platforms.map(({p})=>calcWeek(weekData[c.id]?.[p]).gasto)).reduce((a,b)=>a+b,0);
 const cplGeral=allLeads?(allGasto / allLeads):0;
 const urgentCount=clients.filter(c=>c.platforms.some(({p,meta_cpl})=>{const s=calcWeek(weekData[c.id]?.[p]);return(s.leads||s.gasto)&&cc(s.leads,s.gasto,meta_cpl,p)==="red";})).length;

 const isAdmin=loggedUser?.manager===null||loggedUser?.username==="admin";

 const isGestor=!isAdmin; // both Gestor de Tráfego and Customer Success

 const NAV=[{id:"dashboard",icon:"📊",label:"Dashboard"},
  {id:"week",     icon:"📅",label:"Semana"},{id:"summary",  icon:"📈",label:"Histórico"},
  {id:"results",  icon:"🏆",label:"Resultados"},{id:"agenda",   icon:"🗓️",label:"Agenda"},
  {id:"map",      icon:"🗺️",label:"Mapa"},{id:"products", icon:"📦",label:"Produtos"},
  ...(isAdmin?[{id:"clients",  icon:"👥",label:"Clientes"},
   {id:"settings", icon:"⚙️",label:"Configurações"},]:[]),
 ];

 const LogoBlock=({size="md",collapsed=false})=>{const s=size==="lg"?{mark:44,name:22,sub:11}:{mark:34,name:15,sub:9};
  const activeLogo=theme==="light"?(logoUrl||logoUrlDark):(logoUrlDark||logoUrl);
  return(
   <div style={{display:"flex",alignItems:"center",gap:10}}>
    <div className="sidebar-logo-mark" style={{width:s.mark,height:s.mark,fontSize:s.mark*.4}}>
     {activeLogo
      ?<img src={activeLogo} style={{width:"100%",height:"100%",objectFit:"contain",padding:2}} onError={e=>e.target.style.display="none"} alt="logo"/>
      :"⚡"}
    </div>
    {!collapsed&&(
     <div>
      <div className="logo-text" style={{fontSize:s.name}}>{brandName}</div>
      <div className="logo-sub" style={{fontSize:s.sub}}>{brandSub}</div>
     </div>
    )}
   </div>
  );
 };

 if(screen==="login") return(
  <>
   <style>{STYLES}</style>
   <div className="login-bg">
    <div className="login-grid"/><div className="login-glow"/>
    <div className="login-card">
     <div className="login-logo"><LogoBlock size="lg"/></div>
     <div className="login-title">Bem-vindo de volta</div>
     <div className="login-sub">Acesse o painel da sua agência</div>
     <label className="field-label">Usuário</label>
     <input className="field-input" placeholder="admin" value={loginForm.user}
      onChange={e=>setLoginForm(p=>({...p,user:e.target.value}))}
      onKeyDown={e=>e.key==="Enter"&&document.getElementById("pi")?.focus()}/>
     <label className="field-label">Senha</label>
     <input id="pi" className="field-input" type="password" placeholder="••••••••" value={loginForm.pass}
      onChange={e=>setLoginForm(p=>({...p,pass:e.target.value}))}
      onKeyDown={e=>e.key==="Enter"&&doLogin()}/>
     {loginError&&<div style={{fontSize:11,color:T.red,marginBottom:12,marginTop:-12,fontWeight:600}}>{loginError}</div>}
     <button className="btn-primary" onClick={doLogin}>Entrar</button>
     <div style={{textAlign:"center",marginTop:20,fontSize:11,color:T.muted2,lineHeight:1.8}}>
      admin / 123 · brenda / brenda · gustavo / gustavo
     </div>
    </div>
   </div>
  </>
 );

 return(
  <>
   <style>{STYLES}</style>
   {toast&&<div className="toast"><span style={{fontSize:18}}>{toast.icon}</span><span style={{fontSize:12}}>{toast.msg}</span></div>}

   {}
   {productModal&&<ProductModal client={productModal} onClose={()=>setProductModal(null)} onSave={scope=>saveScope(productModal.id,scope)}/>}

   {}
   {editing&&(()=>{const client=clients.find(c=>c.id===editing.clientId);
    const platCfg=client?.platforms.find(({p})=>p===editing.platform);
    const meta=platCfg?.meta_cpl||35;
    const color=cc(tempVal.leads,tempVal.gasto,meta,editing.platform);
    const cpl=parseFloat(tempVal.leads)>0?(parseFloat(tempVal.gasto) / parseFloat(tempVal.leads)).toFixed(2):null;
    const storedDay=weekData[editing.clientId]?.[editing.platform]?.[editing.day]||{};
    const isManual=storedDay.leads!==""&&storedDay.leads!==undefined&&storedDay.manual;
    const simDay=simData(editing.clientId,editing.platform,dateRange);
    const autoLeads=Math.round(simDay.leads / 7);
    const autoGasto=Math.round(simDay.gasto / 7);
    return(
     <div className="modal-overlay" onClick={()=>setEditing(null)}>
      <div className="modal" onClick={e=>e.stopPropagation()}>
       <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:4}}>
        <div className="modal-title">{client?.name}</div>
        <span className={`platform-badge ${editing.platform}`}>{P_ICON[editing.platform]} {P_LABEL[editing.platform]}</span>
       </div>
       <div className="modal-sub">{editing.day} · {weekDates[DAYS.indexOf(editing.day)]}</div>

       {}
       <div style={{marginBottom:16,padding:"10px 14px",borderRadius:8,background:`${T.accent}10`,border:`1px solid ${T.accent}25`,fontSize:11,color:T.muted,lineHeight:1.6}}>
        ✏️ <strong style={{color:T.text}}>Lançamento manual</strong> — os dados automáticos (via integração) serão substituídos por este valor. Use quando houver erro de tag ou divergência.
        <div style={{marginTop:6,display:"flex",gap:8,alignItems:"center"}}>
         <span style={{fontSize:10,color:T.muted2}}>Automático estimado: {autoLeads} leads · R${autoGasto}</span>
         <button onClick={()=>setTempVal({leads:String(autoLeads),gasto:String(autoGasto)})}
          style={{fontSize:10,background:"none",border:`1px solid ${T.border2}`,color:T.muted,padding:"2px 8px",borderRadius:10,cursor:"pointer",fontFamily:"var(--font-d)",fontWeight:600}}>
          Usar automático
         </button>
        </div>
       </div>

       <label className="field-label">Leads (manual)</label>
       <input className="field-input" type="number" value={tempVal.leads} autoFocus
        onChange={e=>setTempVal(p=>({...p,leads:e.target.value}))}
        onKeyDown={e=>e.key==="Enter"&&gastoRef.current?.focus()}/>
       <label className="field-label">Gasto R$ (manual)</label>
       <input ref={gastoRef} className="field-input" type="number" value={tempVal.gasto}
        onChange={e=>setTempVal(p=>({...p,gasto:e.target.value}))}
        onKeyDown={e=>e.key==="Enter"&&saveCell()}/>

       {cpl&&<div style={{marginBottom:16,padding:"10px 14px",borderRadius:8,background:CS[color].bg,border:`1px solid ${CS[color].border}`,fontSize:12,color:CS[color].accent,fontWeight:600}}>
        CPL: R${cpl} — {color==="green"?"✓ Dentro da meta":color==="yellow"?"⚠ Atenção":"✗ Acima da meta"}
       </div>}

       <div style={{display:"flex",gap:8,marginBottom:10}}>
        <button className="btn-accent" style={{flex:2}} onClick={()=>{
         if(!editing)return;
         const{clientId,platform,day}=editing;
         setWeekData(prev=>{
          const updated={...prev,[clientId]:{...prev[clientId],[platform]:{...prev[clientId][platform],[day]:{leads:tempVal.leads,gasto:tempVal.gasto,manual:true,savedAt:new Date().toISOString()}}}};
          const key=weekDates[0];
          setHistory(h=>({...h,[key]:{data:JSON.parse(JSON.stringify(updated)),dates:[...weekDates],weekOffset}}));
          return updated;
         });
         setEditing(null);
         showToast("✏️","Lançamento manual salvo e registrado no histórico");
        }}>✅ Salvar e registrar</button>
        <button className="btn-sm" style={{flex:1}} onClick={()=>{

         const{clientId,platform,day}=editing;
         setWeekData(prev=>{
          const updated={...prev,[clientId]:{...prev[clientId],[platform]:{...prev[clientId][platform],[day]:{leads:"",gasto:"",manual:false}}}};
          const key=weekDates[0];
          setHistory(h=>({...h,[key]:{data:JSON.parse(JSON.stringify(updated)),dates:[...weekDates],weekOffset}}));
          return updated;
         });
         setEditing(null);
         showToast("🔄","Voltou para dados automáticos");
        }}>🔄 Limpar</button>
        <button className="btn-sm" onClick={()=>setEditing(null)}>✕</button>
       </div>
       <div style={{fontSize:10,color:T.muted2,textAlign:"center"}}>
        📁 Salvo automaticamente no histórico da semana
       </div>
      </div>
     </div>
    );
   })()}

   <div className="app">
    {}
    <aside className={`sidebar ${sidebarOpen?"":"collapsed"}`}>
     <button className="sidebar-collapse-btn" onClick={()=>setSidebarOpen(o=>!o)} title={sidebarOpen?"Recolher menu":"Expandir menu"}>
      {sidebarOpen?"←":"→"}
     </button>
     <div className="sidebar-logo"><LogoBlock collapsed={!sidebarOpen}/></div>
     <div className="nav-section">
      {!sidebarOpen||<div className="nav-label">Menu</div>}
      {NAV.map(item=>(
       <div key={item.id} className={`nav-item ${view===item.id?"active":""}`} title={!sidebarOpen?item.label:""} onClick={()=>{setView(item.id);if(item.id!=="products")setSelectedPlan(null);}}>
        <span className="nav-icon">{item.icon}</span><span>{item.label}</span>
       </div>
      ))}
     </div>
     <div className="sidebar-footer" style={{position:"relative"}}>
      {showLogout&&(
       <div 
         style={{position:"absolute",bottom:"100%",left:10,right:10,marginBottom:6,background:T.bg2,border:`1px solid ${T.border2}`,borderRadius:8,overflow:"hidden",boxShadow:`0 8px 24px rgba(0,0,0,.4)`,zIndex:100,animation:"fadeUp .15s ease"}}>
        <button onClick={()=>{setScreen("login");setLoggedUser(null);setLoginForm({user:"",pass:""});setShowLogout(false);}}
         
           style={{width:"100%",background:"none",border:"none",padding:"12px 16px",cursor:"pointer",fontFamily:"var(--font-d)",fontSize:13,fontWeight:600,color:T.red,textAlign:"left",display:"flex",alignItems:"center",gap:8,transition:"background .15s"}}
         onMouseEnter={e=>e.currentTarget.style.background=`${T.red}15`}
         onMouseLeave={e=>e.currentTarget.style.background="none"}>
         <span>→</span> Sair
        </button>
       </div>
      )}
      <div className="user-chip" onClick={()=>setShowLogout(o=>!o)}>
       <div className="user-avatar" style={{overflow:"hidden",flexShrink:0}}>
        {(()=>{const u=usersState.find(x=>x.username===loggedUser?.username);return u?.photoUrl?<img src={u.photoUrl} 
          style={{width:"100%",height:"100%",objectFit:"cover"}} onError={e=>e.target.style.display="none"} alt={u.name}/>:(loggedUser?.name?.[0]||"A");})()}
       </div>
       {sidebarOpen&&<div style={{flex:1,minWidth:0}}>
        <div className="user-name">{loggedUser?.name||"Admin"}</div>
        <div className="user-role">{loggedUser?.role||"Admin"}</div>
       </div>}
       {sidebarOpen&&<span style={{fontSize:10,color:T.muted,flexShrink:0}}>{showLogout?"▲":"▼"}</span>}
      </div>
     </div>
    </aside>

    <main className={`main ${sidebarOpen?"":"sidebar-collapsed"}`}>
     <div className="topbar">
      <div>
       <div className="page-title">
        {{dashboard:"Dashboard",week:"Semana Atual",summary:"Histórico de Cliente",products:"Produtos & Escopo",map:"Mapa de Clientes",settings:"Configurações",results:"Resultados de Clientes",clients:"Clientes",agenda:"Agenda de Reuniões"}[view]||view}
       </div>
       <div className="page-sub">{weekDates[0]} — {weekDates[5]} · {clients.length} clientes</div>
      </div>
      <div className="topbar-right">
       {view==="products"&&<button className="btn-sm" onClick={()=>showToast("📤","Exportando escopo...")}>📤 Exportar</button>}
      </div>
     </div>

     <div className="content">
      {}
      {["week","summary","products"].includes(view)&&(
       <div className="filter-bar">
        <span className="filter-label">Gestor:</span>
        {["TODOS",...managers].map(m=>(
         <button key={m} className={`filter-btn ${selMgr===m?"active":""}`}
          style={{opacity:loggedUser?.manager&&m!==loggedUser.manager&&m!=="TODOS"?.3:1,cursor:loggedUser?.manager?"default":"pointer"}}
          onClick={()=>{if(!loggedUser?.manager)setSelMgr(m);}}>
          {m}
         </button>
        ))}
        {loggedUser?.manager&&<span style={{fontSize:10,color:"#2e3f58",marginLeft:4}}>— visão restrita à sua carteira</span>}
       </div>
      )}

      {}
      {view==="dashboard"&&(()=>{const avg=arr=>arr.length?(arr.reduce((a,b)=>a+b,0) / arr.length):0;
       const getV=row=>{if(sortCol==="leads")   return row.sim.leads;
        if(sortCol==="cpl")     return row.sim.cpl;
        if(sortCol==="ctr")     return row.sim.ctr;
        if(sortCol==="cliques") return row.sim.cliques;
        if(sortCol==="cpc")     return row.sim.cpc;
        if(sortCol==="gasto")   return row.sim.gasto;
        if(sortCol==="pct")     return row.pctBudget||0;
        return 0;
       };
       const SortTh=({col,label})=>{const active=sortCol===col;
        return(
         <th className="dash-th" style={{cursor:"pointer",userSelect:"none",color:active?"var(--accent)":"var(--muted)",whiteSpace:"nowrap"}}
          onClick={()=>{if(sortCol===col)setSortDir(d=>d==="asc"?"desc":"asc");else{setSortCol(col);setSortDir("desc");}}}>
          {label} <span style={{opacity:.5,fontSize:8}}>{active?(sortDir==="asc"?"▲":"▼"):"⇅"}</span>
         </th>
        );
       };
       const groupByMgr=selMgr==="TODOS"?managers:[selMgr];
       return(
        <div>
         {}
         {(()=>{
          const gLeads=clients.flatMap(c=>c.platforms.filter(pl=>pl.p==="google").map(()=>calcWeek(weekData[c.id]?.google).leads)).reduce((a,b)=>a+b,0);
          const mLeads=clients.flatMap(c=>c.platforms.filter(pl=>pl.p==="meta").map(()=>calcWeek(weekData[c.id]?.meta).leads)).reduce((a,b)=>a+b,0);
          const gGasto=clients.flatMap(c=>c.platforms.filter(pl=>pl.p==="google").map(()=>calcWeek(weekData[c.id]?.google).gasto)).reduce((a,b)=>a+b,0);
          const mGasto=clients.flatMap(c=>c.platforms.filter(pl=>pl.p==="meta").map(()=>calcWeek(weekData[c.id]?.meta).gasto)).reduce((a,b)=>a+b,0);
          const gCpl=gLeads>0?(gGasto / gLeads):0;
          const mCpl=mLeads>0?(mGasto / mLeads):0;

          const tiers={positiva:[],atencaoAds:[],atencaoRoas:[],urgencia:[]};
          clients.forEach(c=>{
           const cplStatuses=c.platforms.map(({p,meta_cpl})=>{const s=simData(c.id,p,dateRange);return cc(s.leads,s.gasto,meta_cpl,p);});
           const cplOk=cplStatuses.every(s=>s==="green"||s==="empty");
           const cplBad=cplStatuses.some(s=>s==="red");
           const roasValues=c.platforms.map(({p})=>{const s=simData(c.id,p,dateRange);const cpl=s.leads>0?(s.gasto / s.leads):0;return p==="google"?cpl>0?35 / cpl*8:0:cpl>0?9 / cpl*12:0;});
           const avgRoas=roasValues.length?(roasValues.reduce((a,b)=>a+b,0) / roasValues.length):0;
           if(cplOk&&avgRoas>=15) tiers.positiva.push(c);
           else if(!cplBad&&avgRoas>=10) tiers.atencaoRoas.push(c);
           else if(cplBad&&avgRoas>=10) tiers.atencaoAds.push(c);
           else tiers.urgencia.push(c);
          });
          return(
           <>
            {}
            <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:14,marginBottom:14}}>
             <div className="stat-card" style={{"--accent-line":"#4285f4",animationDelay:"0s"}}>
              <div className="stat-label">Total de Leads</div>
              <div className="stat-value" style={{color:T.accent,fontSize:26}}>{(gLeads+mLeads)||"—"}</div>
              <div style={{display:"flex",gap:10,marginTop:8}}>
               <div style={{flex:1,background:T.bg2,borderRadius:6,padding:"5px 8px"}}>
                <div style={{fontSize:8,color:"#4285f4",fontWeight:700,textTransform:"uppercase",letterSpacing:.5}}>Google</div>
                <div style={{fontFamily:"var(--font-d)",fontSize:15,fontWeight:800,color:"#4285f4"}}>{gLeads||"0"}</div>
               </div>
               <div style={{flex:1,background:T.bg2,borderRadius:6,padding:"5px 8px"}}>
                <div style={{fontSize:8,color:"#0082fb",fontWeight:700,textTransform:"uppercase",letterSpacing:.5}}>Meta</div>
                <div style={{fontFamily:"var(--font-d)",fontSize:15,fontWeight:800,color:"#0082fb"}}>{mLeads||"0"}</div>
               </div>
              </div>
             </div>
             <div className="stat-card" style={{"--accent-line":"#6366f1",animationDelay:".05s"}}>
              <div className="stat-label">Gasto Total</div>
              <div className="stat-value" style={{color:"#6366f1",fontSize:26}}>{(gGasto+mGasto)?`R$${(gGasto+mGasto).toFixed(0)}`:"—"}</div>
              <div style={{display:"flex",gap:10,marginTop:8}}>
               <div style={{flex:1,background:T.bg2,borderRadius:6,padding:"5px 8px"}}>
                <div style={{fontSize:8,color:"#4285f4",fontWeight:700,textTransform:"uppercase",letterSpacing:.5}}>Google</div>
                <div style={{fontFamily:"var(--font-d)",fontSize:13,fontWeight:800,color:"#4285f4"}}>{gGasto?`R$${gGasto.toFixed(0)}`:"—"}</div>
               </div>
               <div style={{flex:1,background:T.bg2,borderRadius:6,padding:"5px 8px"}}>
                <div style={{fontSize:8,color:"#0082fb",fontWeight:700,textTransform:"uppercase",letterSpacing:.5}}>Meta</div>
                <div style={{fontFamily:"var(--font-d)",fontSize:13,fontWeight:800,color:"#0082fb"}}>{mGasto?`R$${mGasto.toFixed(0)}`:"—"}</div>
               </div>
              </div>
             </div>
             <div className="stat-card" style={{"--accent-line":T.green,animationDelay:".1s"}}>
              <div className="stat-label">CPL Médio</div>
              <div className="stat-value" style={{color:T.green,fontSize:26}}>{(gCpl||mCpl)?`R$${((gCpl+mCpl) / ((gCpl?1:0)+(mCpl?1:0))).toFixed(2)}`:"—"}</div>
              <div style={{display:"flex",gap:10,marginTop:8}}>
               <div style={{flex:1,background:T.bg2,borderRadius:6,padding:"5px 8px"}}>
                <div style={{fontSize:8,color:"#4285f4",fontWeight:700,textTransform:"uppercase",letterSpacing:.5}}>Google</div>
                <div style={{fontFamily:"var(--font-d)",fontSize:13,fontWeight:800,color:gCpl<=35?T.green:gCpl<=40?T.yellow:T.red}}>{gCpl?`R$${gCpl.toFixed(2)}`:"—"}</div>
               </div>
               <div style={{flex:1,background:T.bg2,borderRadius:6,padding:"5px 8px"}}>
                <div style={{fontSize:8,color:"#0082fb",fontWeight:700,textTransform:"uppercase",letterSpacing:.5}}>Meta</div>
                <div style={{fontFamily:"var(--font-d)",fontSize:13,fontWeight:800,color:mCpl<=9?T.green:mCpl<=12?T.yellow:T.red}}>{mCpl?`R$${mCpl.toFixed(2)}`:"—"}</div>
               </div>
              </div>
             </div>
            </div>

            {}
            <div className="stat-card" style={{"--accent-line":tiers.urgencia.length>0?T.red:T.green,animationDelay:".15s",marginBottom:24,padding:"14px 20px"}}>
             <div style={{display:"flex",alignItems:"center",gap:20,flexWrap:"wrap"}}>
              <div style={{display:"flex",alignItems:"center",gap:8,marginRight:8}}>
               <span style={{fontFamily:"var(--font-d)",fontSize:13,fontWeight:700,color:T.muted,textTransform:"uppercase",letterSpacing:.5}}>Contas</span>
               <span style={{fontFamily:"var(--font-d)",fontSize:22,fontWeight:800,color:T.text}}>{clients.length}</span>
              </div>
              <div style={{width:1,height:32,background:T.border,flexShrink:0}}/>
              {[{label:"✅ Positivas",count:tiers.positiva.length,color:T.green},
               {label:"⚠️ Atenção Ads",count:tiers.atencaoAds.length,color:T.yellow},{label:"📉 Atenção ROAS",count:tiers.atencaoRoas.length,color:T.yellow},
               {label:"🔴 Urgência",count:tiers.urgencia.length,color:T.red},].map(({label,count,color},i)=>(
               <div key={label} style={{display:"flex",alignItems:"center",gap:10,flex:1,minWidth:150,padding:"8px 14px",borderRadius:8,background:`${color}10`,border:`1px solid ${color}25`}}>
                <span style={{fontSize:11,fontWeight:600,color,flex:1}}>{label}</span>
                <span style={{fontFamily:"var(--font-d)",fontSize:22,fontWeight:800,color}}>{count}</span>
               </div>
              ))}
             </div>
            </div>
           </>
          );
         })()}
         <div className="dash-filter-bar">
          <span className="filter-label">Período:</span>
          {[{k:"hoje",l:"Hoje"},{k:"ontem",l:"Ontem"},{k:"semana",l:"Esta Semana"},{k:"mes",l:"Este Mês"}].map(({k,l})=>(
           <button key={k} className={`date-btn ${dateRange===k?"active":""}`} onClick={()=>setDateRange(k)}>{l}</button>
          ))}
          <button className={`date-btn ${dateRange==="custom"?"active":""}`} onClick={()=>setDateRange("custom")}>📅 Personalizado</button>
          {dateRange==="custom"&&(
           <div style={{display:"flex",alignItems:"center",gap:8,background:T.bg2,border:`1px solid ${T.border2}`,borderRadius:8,padding:"4px 12px"}}>
            <input type="date" value={customDateFrom} onChange={e=>setCustomDateFrom(e.target.value)}
             style={{background:"none",border:"none",color:T.text,fontFamily:"var(--font-d)",fontSize:12,outline:"none"}}/>
            <span style={{color:T.muted,fontSize:12}}>→</span>
            <input type="date" value={customDateTo} onChange={e=>setCustomDateTo(e.target.value)}
             style={{background:"none",border:"none",color:T.text,fontFamily:"var(--font-d)",fontSize:12,outline:"none"}}/>
           </div>
          )}
          <div style={{marginLeft:"auto",display:"flex",alignItems:"center",gap:8}}>
           <span className="api-badge sim">⚡ Dados simulados</span>
           <button className="btn-sm" style={{fontSize:10}} onClick={()=>showToast("🔌","Configure as credenciais")}>Conectar API</button>
          </div>
         </div>
         {groupByMgr.map(mgr=>{const mgrClients=filtered.filter(c=>c.manager===mgr);
          const mgrRows=mgrClients.flatMap(client=>
           client.platforms.map(({p,meta_cpl})=>{const sim=simData(client.id,p,dateRange);
            const info=client.info||DEFAULT_CLIENT_INFO;
            const budgetVal=p==="google"?(info.budget_google||0):(info.budget_meta||0);
            const pctBudget=budgetVal>0?(sim.gasto / budgetVal*100):null;
            return{client,p,meta_cpl,sim,budgetVal,pctBudget,color:cc(sim.leads,sim.gasto,meta_cpl,p)};
           })
          );
          const sortedRows=[...mgrRows].sort((a,b)=>sortDir==="desc"?getV(b)-getV(a):getV(a)-getV(b));
          const summ={google:{leads:0,gasto:0,cliques:0,cplArr:[],ctrArr:[],cpcArr:[],count:0},meta:{leads:0,gasto:0,cliques:0,cplArr:[],ctrArr:[],cpcArr:[],count:0}};
          mgrRows.forEach(({p,sim})=>{if(!summ[p]) return;
           summ[p].leads+=sim.leads; summ[p].gasto+=sim.gasto; summ[p].cliques+=sim.cliques;
           summ[p].cplArr.push(sim.cpl); summ[p].ctrArr.push(sim.ctr); summ[p].cpcArr.push(sim.cpc); summ[p].count++;
          });
          const activePlatforms=["google","meta"].filter(pt=>summ[pt].count>0);
          return(
           <div key={mgr} className="dash-table-wrap">
            <div className="dash-table-header">
             <div className="manager-badge"><div className="manager-dot"/>{mgr}<span style={{fontSize:11,color:"#4a5f7a",fontWeight:400,marginLeft:4}}>{mgrClients.length} clientes</span></div>
             <div style={{display:"flex",gap:8}}>
              <span className="platform-badge google">Google Ads</span>
              <span className="platform-badge meta">Meta Ads</span>
             </div>
            </div>
            <div style={{overflowX:"auto"}}>
             <table className="dash-table">
              <thead>
               <tr>
                <th className="dash-th left" style={{minWidth:150,cursor:"default"}}>Cliente</th>
                <th className="dash-th left" style={{minWidth:120,cursor:"default"}}>Plataforma</th>
                <SortTh col="leads"   label="Leads"/>
                <SortTh col="cpl"     label="CPL"/>
                <SortTh col="ctr"     label="CTR"/>
                <SortTh col="cliques" label="Cliques"/>
                <SortTh col="cpc"     label="CPC"/>
                <SortTh col="gasto"   label="Gasto"/>
                <th className="dash-th" style={{cursor:"default"}}>Budget</th>
                <SortTh col="pct"     label="% Budget"/>
               </tr>
              </thead>
              <tbody>
               {}
               {(()=>{
                const seen=new Set();
                const clientOrder=[];
                sortedRows.forEach(r=>{if(!seen.has(r.client.id)){seen.add(r.client.id);clientOrder.push(r.client);}
                });
                return clientOrder.map(client=>{const clientRows=mgrRows.filter(r=>r.client.id===client.id);
                 return clientRows.map((row,ri)=>{const {p,sim,budgetVal,pctBudget,color}=row;
                  const cs=CS[color];
                  const isFirst=ri===0;
                  return(
                   <tr key={`${client.id}-${p}`} className="dash-tr" style={{borderTop:isFirst?`1px solid ${T.border}`:"none"}}>
                    {isFirst&&(
                     <td className="dash-td left" rowSpan={clientRows.length}
                      style={{borderRight:`1px solid ${T.border}`,verticalAlign:"middle",background:T.bg1}}>
                      <div style={{fontFamily:"var(--font-d)",fontWeight:700,fontSize:12,color:T.text}}>{client.name}</div>
                      <div style={{fontSize:10,color:T.muted,marginTop:2}}>{client.manager}</div>
                     </td>
                    )}
                    <td className="dash-td left"><span className={`platform-badge ${p}`}>{P_LABEL[p]}</span></td>
                    <td className="dash-td" style={{color:T.accent,fontWeight:600}}>{sim.leads}</td>
                    <td className="dash-td"><span className="cpl-cell" style={{background:cs.bg,color:cs.accent,border:`1px solid ${cs.border}`}}>R${sim.cpl.toFixed(2)}</span></td>
                    <td className="dash-td" style={{color:T.muted}}>{sim.ctr.toFixed(2)}%</td>
                    <td className="dash-td">{sim.cliques.toLocaleString()}</td>
                    <td className="dash-td" style={{color:T.muted}}>R${sim.cpc.toFixed(2)}</td>
                    <td className="dash-td" style={{color:T.text}}>R${sim.gasto.toLocaleString()}</td>
                    <td className="dash-td">
                     {budgetVal>0
                      ?<span style={{fontSize:11,fontFamily:"var(--font-m)",color:T.muted}}>R${budgetVal.toLocaleString()}</span>
                      :<span style={{color:T.muted2,fontSize:11}}>—</span>}
                    </td>
                    <td className="dash-td">
                     {pctBudget!=null?(
                      <div style={{display:"flex",alignItems:"center",gap:6}}>
                       <span style={{fontWeight:700,fontSize:12,color:pctBudget>100?T.red:pctBudget>80?T.yellow:T.green}}>
                        {pctBudget.toFixed(0)}%
                       </span>
                       {pctBudget>100&&<span style={{fontSize:9,fontWeight:700,background:`${T.red}20`,color:T.red,border:`1px solid ${T.red}30`,padding:"1px 6px",borderRadius:10}}>PASSOU</span>}
                      </div>
                     ):<span style={{color:T.muted2}}>—</span>}
                    </td>
                   </tr>
                  );
                 });
                });
               })()}
              </tbody>
              <tfoot>
               {activePlatforms.map((pt,pti)=>{const s=summ[pt];
                const cplAvg=avg(s.cplArr),ctrAvg=avg(s.ctrArr),cpcAvg=avg(s.cpcArr);
                const bdr="2px solid var(--border2)";
                return(
                 <tr key={pt} style={{background:"var(--bg3)"}}>
                  {pti===0&&(
                   <td className="dash-td left" rowSpan={activePlatforms.length}
                    
                      style={{verticalAlign:"middle",borderRight:"1px solid var(--border2)",borderTop:bdr,fontFamily:"var(--font-d)",fontWeight:800,fontSize:10,color:"var(--muted)",letterSpacing:.5,textTransform:"uppercase"}}>
                    Resumo Geral
                   </td>
                  )}
                  <td className="dash-td left" style={{borderTop:bdr}}><span className={`platform-badge ${pt}`} style={{fontWeight:800}}>{P_LABEL[pt]}</span></td>
                  <td className="dash-td" style={{borderTop:bdr,color:"#3b82f6",fontWeight:700}}>{s.leads}</td>
                  <td className="dash-td" style={{borderTop:bdr,fontWeight:700}}>R${cplAvg.toFixed(2)}</td>
                  <td className="dash-td" style={{borderTop:bdr,color:"#94a3b8"}}>{ctrAvg.toFixed(2)}%</td>
                  <td className="dash-td" style={{borderTop:bdr}}>{s.cliques.toLocaleString()}</td>
                  <td className="dash-td" style={{borderTop:bdr,color:"#94a3b8"}}>R${cpcAvg.toFixed(2)}</td>
                  <td className="dash-td" style={{borderTop:bdr,color:"#e8edf5",fontWeight:700}}>R${s.gasto.toLocaleString()}</td>
                  <td className="dash-td" style={{borderTop:bdr,color:"var(--muted2)"}}>—</td>
                  <td className="dash-td" style={{borderTop:bdr,color:"var(--muted2)"}}>—</td>
                 </tr>
                );
               })}
              </tfoot>
             </table>
            </div>
           </div>
          );
         })}
        </div>
       );
      })()}

      {}
      {view==="week"&&(
       <div>
        {}
        <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:20,background:T.bg1,border:`1px solid ${T.border}`,borderRadius:10,padding:"10px 16px",flexWrap:"wrap"}}>
         {}
         {!weekCustomMode&&(
          <>
           <button onClick={()=>setWeekOffset(o=>o-1)}
            
              style={{width:32,height:32,borderRadius:"50%",border:`1px solid ${T.border2}`,background:T.bg2,color:T.text,cursor:"pointer",fontSize:16,display:"flex",alignItems:"center",justifyContent:"center",transition:"all .15s"}}
            onMouseEnter={e=>e.currentTarget.style.borderColor=T.accent}
            onMouseLeave={e=>e.currentTarget.style.borderColor=T.border2}>‹</button>
           <div style={{fontFamily:"var(--font-d)",fontSize:13,fontWeight:700,color:T.text,minWidth:180,textAlign:"center"}}>
            {weekOffset===0?"Semana Atual":weekOffset===-1?"Semana Passada":weekOffset===1?"Próxima Semana":`${weekOffset>0?"+":""}${weekOffset} semana${Math.abs(weekOffset)!==1?"s":""}`}
            <div style={{fontSize:10,color:T.muted,fontWeight:400,marginTop:1}}>
             {weekDates[0]} → {weekDates[weekDates.length-1]}
            </div>
           </div>
           <button onClick={()=>setWeekOffset(o=>o+1)}
            
              style={{width:32,height:32,borderRadius:"50%",border:`1px solid ${T.border2}`,background:T.bg2,color:T.text,cursor:"pointer",fontSize:16,display:"flex",alignItems:"center",justifyContent:"center",transition:"all .15s"}}
            onMouseEnter={e=>e.currentTarget.style.borderColor=T.accent}
            onMouseLeave={e=>e.currentTarget.style.borderColor=T.border2}>›</button>
           {weekOffset!==0&&(
            <button onClick={()=>setWeekOffset(0)}
             style={{fontSize:11,fontWeight:600,padding:"4px 10px",borderRadius:20,border:`1px solid ${T.border2}`,background:"none",color:T.muted,cursor:"pointer",fontFamily:"var(--font-d)"}}>
             Hoje
            </button>
           )}
          </>
         )}

         {}
         {weekCustomMode&&(
          <div style={{display:"flex",alignItems:"center",gap:8,flex:1}}>
           <span style={{fontSize:11,color:T.muted,fontWeight:600}}>De</span>
           <input type="date" value={weekCustomStart} onChange={e=>setWeekCustomStart(e.target.value)}
            style={{background:T.bg2,border:`1px solid ${T.border2}`,borderRadius:6,color:T.text,padding:"5px 10px",fontSize:12,fontFamily:"var(--font-d)",outline:"none"}}/>
           <span style={{fontSize:11,color:T.muted,fontWeight:600}}>até</span>
           <input type="date" value={weekCustomEnd}
            onChange={e=>{const start=new Date(weekCustomStart);
             const end=new Date(e.target.value);
             const diff=Math.round((end - start) / (1000 * 60 * 60 * 24));
             if(diff>6){const capped=new Date(start);capped.setDate(start.getDate()+6);
              setWeekCustomEnd(capped.toISOString().split("T")[0]);
             } else {setWeekCustomEnd(e.target.value);
             }
            }}
            style={{background:T.bg2,border:`1px solid ${T.border2}`,borderRadius:6,color:T.text,padding:"5px 10px",fontSize:12,fontFamily:"var(--font-d)",outline:"none"}}/>
           {weekCustomStart&&weekCustomEnd&&(
            <span style={{fontSize:10,color:T.muted}}>
             ({Math.min(7,Math.round((new Date(weekCustomEnd) - new Date(weekCustomStart)) / (1000 * 60 * 60 * 24))+1)} dias)
            </span>
           )}
          </div>
         )}

         {}
         <button onClick={()=>{setWeekCustomMode(m=>!m);if(weekCustomMode)setWeekOffset(0);}}
          
            style={{marginLeft:"auto",fontSize:11,fontWeight:600,padding:"6px 14px",borderRadius:20,border:`1px solid ${weekCustomMode?T.accent:T.border2}`,background:weekCustomMode?`${T.accent}15`:"none",color:weekCustomMode?T.accent:T.muted,cursor:"pointer",fontFamily:"var(--font-d)",transition:"all .15s"}}>
          📅 {weekCustomMode?"Cancelar personalizado":"Período personalizado"}
         </button>
        </div>
        {(selMgr==="TODOS"?managers:[selMgr]).map(mgr=>{const mgrClients=filtered.filter(c=>c.manager===mgr);
         const clientsWithScore=mgrClients.map(client=>{const cpls=client.platforms.map(({p,meta_cpl})=>{
           const manual=calcWeek(weekData[client.id]?.[p]);
           return manual.leads>0?manual.cpl:simData(client.id,p,dateRange).cpl;
          });
          const avgCpl=cpls.length?(cpls.reduce((a,b)=>a+b,0) / cpls.length):0;
          return{...client,_avgCpl:avgCpl};
         });
         const sortedClients=[...clientsWithScore].sort((a,b)=>b._avgCpl-a._avgCpl);
         return(
          <div key={mgr} className="week-section">
           <div className="week-section-header">
            <div className="manager-badge"><div className="manager-dot"/>{mgr}<span 
              style={{fontSize:11,color:"#4a5f7a",fontFamily:"var(--font-m)",fontWeight:400,marginLeft:4}}>{mgrClients.length} clientes</span></div>
            <div style={{display:"flex",alignItems:"center",gap:12}}>
             <span style={{fontSize:10,color:"#4a5f7a",fontFamily:"var(--font-m)"}}>🔴 pior → 🟢 melhor</span>
             <span className="platform-badge google">Google Ads</span>
             <span className="platform-badge meta">Meta Ads</span>
            </div>
           </div>
           <div className="table-header" style={{gridTemplateColumns:`200px 100px repeat(${weekDates.length},1fr) 64px 80px 88px`}}>
            <div className="th left">Cliente / Plano</div>
            <div className="th">Plat.</div>
            {weekDates.map((date,i)=>{
             const dayLabel=weekCustomMode?(["DOM","SEG","TER","QUA","QUI","SEX","SAB","DOM","SEG","TER"][i]||""):DAYS[i]||"";
             return(
              <div key={i} className="th" style={{textAlign:"center",opacity:dayLabel==="DOM"?.7:1}}>
               <div style={{fontSize:10,color:dayLabel==="DOM"?T.accent:"var(--text)",fontWeight:dayLabel==="DOM"?700:500,letterSpacing:1}}>{dayLabel}</div>
               <div style={{fontSize:9,color:"var(--muted)"}}>{date}</div>
              </div>
             );
            })}
            <div className="th">Leads</div>
            <div className="th">Gasto</div>
            <div className="th">CPL</div>
           </div>
           {sortedClients.map((client,rank)=>{const planInfo=INNOVA_PLANS.find(pl=>pl.id===client.plan);
            return(
             <div key={client.id} className="client-group">
              <div className="client-group-name-row" style={{gridTemplateColumns:`200px 100px repeat(${weekDates.length},1fr) 64px 80px 88px`}}>
               <div style={{display:"flex",flexDirection:"column",gap:3,paddingRight:8}}>
                <div style={{display:"flex",alignItems:"center",gap:6}}>
                 <span style={{fontSize:9,fontFamily:"var(--font-m)",color:rank===0?T.red:rank===sortedClients.length-1?T.green:T.muted,fontWeight:700,minWidth:18}}>#{rank+1}</span>
                 <div className="client-group-name">{client.name}</div>
                </div>
                <button className="product-chip" onClick={()=>setProductModal(client)} style={{alignSelf:"flex-start",maxWidth:"100%"}}>
                 {planInfo?`${planInfo.dot} ${planInfo.name}`:"📋 Definir plano"}
                </button>
               </div>
               <div/>
               <div/>
               {weekDates.map((_,i)=><div key={i}/>)}
               <div/><div/><div/>
              </div>
              {client.platforms.map(({p,meta_cpl})=>{const pData=weekData[client.id]?.[p]||{};
               const manualStats=calcWeek(pData);
               const hasManual=manualStats.leads>0||manualStats.gasto>0;
               const sim=simData(client.id,p,dateRange);
               const displayStats=hasManual?manualStats:{leads:sim.leads,gasto:sim.gasto,cpl:sim.cpl};
               const wc=displayStats.leads===0&&displayStats.gasto===0?"empty":cc(displayStats.leads,displayStats.gasto,meta_cpl,p);
               const cs=CS[wc];
               const activeDays=weekCustomMode?weekDates.map((_,i)=>DAYS[i]).filter(Boolean):DAYS;
               return(
                <div key={p} className="platform-row" style={{gridTemplateColumns:`200px 100px repeat(${weekDates.length},1fr) 64px 80px 88px`}}>
                 <div/>
                 <div style={{display:"flex",alignItems:"center"}}>
                  <span className={`platform-badge ${p}`}>{P_LABEL[p]}</span>
                 </div>
                 {activeDays.map((day,di)=>{const d=pData[day]||{};
                  const hasDay=(d.leads!==""&&d.leads!==undefined)||(d.gasto!==""&&d.gasto!==undefined);
                  const simDay={leads:Math.round(sim.leads / activeDays.length),gasto:Math.round(sim.gasto / activeDays.length)};
                  const dispLeads=hasDay?parseFloat(d.leads)||0:simDay.leads;
                  const dispGasto=hasDay?parseFloat(d.gasto)||0:simDay.gasto;
                  const c2=cc(dispLeads,dispGasto,meta_cpl,p);
                  const isSun=day==="DOM";
                  const isManualCell=hasDay&&d.manual;
                  return(
                   <button key={day} className={`day-cell ${c2}`}
                    style={{opacity:hasDay?1:.65,outline:hasDay?"none":"1px dashed rgba(255,255,255,.08)",borderTop:isSun?`2px solid ${T.accent}40`:undefined,position:"relative"}}
                    onClick={()=>openEdit(client.id,p,day)}>
                    {dispLeads||dispGasto?(
                     <>
                      <span className="cell-leads">{dispLeads}</span>
                      <span className="cell-gasto">R${dispGasto}</span>
                      {dispLeads>0&&<span className="cell-cpl">CPL {(dispGasto / dispLeads).toFixed(0)}</span>}
                      {isManualCell&&<span style={{position:"absolute",top:2,right:3,fontSize:7,opacity:.7}}>✏️</span>}
                     </>
                    ):<span className="cell-plus">+</span>}
                   </button>
                  );
                 })}
                 <div className="total-leads" style={{color:hasManual?T.accent:"#2e4a6a"}}>{displayStats.leads||<span style={{color:"#2e3f58"}}>—</span>}</div>
                 <div className="total-gasto" 
                   style={{fontSize:10,textAlign:"center",color:T.muted}}>{displayStats.gasto?`R$${displayStats.gasto.toFixed(0)}`:<span 
                   style={{color:"#2e3f58"}}>—</span>}</div>
                 <div className="total-cpl" style={{background:cs.bg,color:cs.accent,border:`1px solid ${cs.border}`,opacity:hasManual?1:.7}}>
                  {displayStats.cpl?`R$${displayStats.cpl.toFixed(2)}`:<span style={{color:"#2e3f58"}}>—</span>}
                 </div>
                </div>
               );
              })}
             </div>
            );
           })}
          </div>
         );
        })}
       </div>
      )}

      {}
      {view==="summary"&&(()=>{
       function getWeekBlock(offsetWeeks){const dates=getWeekDates(offsetWeeks);
        const label=offsetWeeks===0?"Semana Atual":offsetWeeks===-1?"Semana Passada":`${Math.abs(offsetWeeks)} sem. atrás`;
        return{dates,label,offsetWeeks};
       }

       return(
        <div>
         {}
         <div style={{display:"flex",gap:14,alignItems:"flex-end",marginBottom:24,background:T.bg1,border:`1px solid ${T.border}`,borderRadius:10,padding:"14px 18px",flexWrap:"wrap"}}>
          <div style={{flex:1,minWidth:220}}>
           <label style={{fontSize:10,fontWeight:700,color:T.muted,letterSpacing:1,textTransform:"uppercase",display:"block",marginBottom:6}}>Selecionar Cliente</label>
           <select value={summaryClientId} onChange={e=>setSummaryClientId(e.target.value)}
            
              style={{width:"100%",background:T.bg2,border:`1px solid ${T.border2}`,borderRadius:8,color:summaryClientId?T.text:T.muted,padding:"9px 12px",fontSize:13,fontFamily:"var(--font-d)",outline:"none",cursor:"pointer"}}>
            <option value="">— escolha um cliente —</option>
            {managers.map(mgr=>(
             <optgroup key={mgr} label={mgr}>
              {clients.filter(c=>c.manager===mgr).map(c=>(
               <option key={c.id} value={c.id}>{c.name}</option>
              ))}
             </optgroup>
            ))}
           </select>
          </div>
          <div>
           <label style={{fontSize:10,fontWeight:700,color:T.muted,letterSpacing:1,textTransform:"uppercase",display:"block",marginBottom:6}}>Semanas visíveis</label>
           <div style={{display:"flex",gap:4}}>
            {[3,5,7,10].map(n=>(
             <button key={n} onClick={()=>setSummaryWeeksCount(n)}
              
                style={{padding:"8px 14px",borderRadius:8,border:`1px solid ${summaryWeeksCount===n?T.accent:T.border2}`,background:summaryWeeksCount===n?`${T.accent}18`:"none",color:summaryWeeksCount===n?T.accent:T.muted,cursor:"pointer",fontFamily:"var(--font-d)",fontSize:12,fontWeight:600,transition:"all .15s"}}>
              {n}
             </button>
            ))}
           </div>
          </div>
         </div>

         {!summaryClientId?(
          <div style={{textAlign:"center",padding:"80px 0",color:T.muted2}}>
           <div style={{fontSize:48,marginBottom:16,opacity:.3}}>◈</div>
           <div style={{fontFamily:"var(--font-d)",fontSize:15,fontWeight:700,marginBottom:6,color:T.muted}}>Selecione um cliente acima</div>
           <div style={{fontSize:12}}>O histórico de semanas será carregado automaticamente</div>
          </div>
         ):(()=>{const client=clients.find(c=>String(c.id)===String(summaryClientId));
          if(!client) return null;
          const plan=INNOVA_PLANS.find(p=>p.id===client.plan);

          const weeks=Array.from({length:summaryWeeksCount},(_,i)=>getWeekBlock(-i));

          return(
           <div style={{animation:"fadeUp .3s ease"}}>
            {}
            <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:20,flexWrap:"wrap"}}>
             <div style={{fontFamily:"var(--font-d)",fontSize:18,fontWeight:800,color:T.text}}>{client.name}</div>
             {plan&&<span 
               style={{fontSize:11,fontWeight:600,padding:"3px 10px",borderRadius:20,background:`${plan.color}18`,color:plan.color,border:`1px solid ${plan.color}30`}}>{plan.dot} {plan.name}</span>}
             <span style={{fontSize:11,color:T.muted,background:T.bg2,border:`1px solid ${T.border}`,padding:"3px 10px",borderRadius:20}}>{client.manager}</span>
             <span style={{marginLeft:"auto",fontSize:11,color:T.muted}}>Mostrando {summaryWeeksCount} semanas · dados automáticos</span>
            </div>

            {}
            {client.platforms.map(({p,meta_cpl})=>(
             <div key={p} style={{background:T.bg1,border:`1px solid ${T.border}`,borderRadius:14,overflow:"hidden",marginBottom:16}}>
              {}
              <div style={{padding:"12px 16px",background:T.bg2,borderBottom:`1px solid ${T.border}`,display:"flex",alignItems:"center",justifyContent:"space-between"}}>
               <div style={{display:"flex",alignItems:"center",gap:10}}>
                <span className={`platform-badge ${p}`}>{P_LABEL[p]}</span>
                <span style={{fontSize:11,color:T.muted}}>Meta CPL: {p==="google"?"R$35":"R$9"}</span>
               </div>
               <span style={{fontSize:10,color:T.muted}}>🔴 pior CPL → 🟢 melhor</span>
              </div>

              {}
              <div style={{display:"grid",gridTemplateColumns:`150px repeat(7,1fr) 64px 80px 88px`,gap:3,padding:"8px 16px",background:T.bg3,borderBottom:`1px solid ${T.border}`}}>
               <div style={{fontSize:9,color:T.muted,fontWeight:700,textTransform:"uppercase",letterSpacing:.5}}>Período</div>
               {DAYS.map(d=>(
                <div key={d} style={{textAlign:"center",fontSize:9,color:d==="DOM"?T.accent:T.muted,fontWeight:700,letterSpacing:.5}}>{d}</div>
               ))}
               <div style={{textAlign:"center",fontSize:9,color:T.muted,fontWeight:700,textTransform:"uppercase"}}>Leads</div>
               <div style={{textAlign:"center",fontSize:9,color:T.muted,fontWeight:700,textTransform:"uppercase"}}>Gasto</div>
               <div style={{textAlign:"center",fontSize:9,color:T.muted,fontWeight:700,textTransform:"uppercase"}}>CPL</div>
              </div>

              {}
              {weeks.map((week,wi)=>{
               const dayData=DAYS.map((_,di)=>{
                const seed=(client.id*31+p.length*17+(week.offsetWeeks*13+di*7))%100;
                const baseLead=Math.floor(3+seed*.15);
                const baseGasto=Math.floor(80+seed*4);

                const isWeekend=di===0||di===6;
                const mult=isWeekend?.4:1;
                return{leads:Math.max(0,Math.floor(baseLead*mult+(seed%3-1))),
                 gasto:Math.max(0,Math.floor(baseGasto*mult+(seed%20-10))),};
               });
               const totalL=dayData.reduce((s,d)=>s+d.leads,0);
               const totalG=dayData.reduce((s,d)=>s+d.gasto,0);
               const cpl=totalL>0?(totalG / totalL):0;
               const rowColor=totalL===0&&totalG===0?"empty":cc(totalL,totalG,meta_cpl,p);
               const cs=CS[rowColor];
               const isCurrentWeek=wi===0;

               return(
                <div key={week.offsetWeeks}
                 
                   style={{display:"grid",gridTemplateColumns:`150px repeat(7,1fr) 64px 80px 88px`,gap:3,padding:"4px 16px",alignItems:"center",borderBottom:`1px solid ${T.border}50`,background:isCurrentWeek?`${T.accent}05`:"transparent"}}>
                 {}
                 <div>
                  <div style={{fontSize:11,fontWeight:isCurrentWeek?700:500,color:isCurrentWeek?T.accent:T.muted}}>{week.label}</div>
                  <div style={{fontSize:9,color:T.muted2,marginTop:1}}>{week.dates[0]} → {week.dates[6]||week.dates[week.dates.length-1]}</div>
                 </div>
                 {}
                 {dayData.map((d,di)=>{const c2=d.leads===0&&d.gasto===0?"empty":cc(d.leads,d.gasto,meta_cpl,p);
                  return(
                   <div 
                     key={di} 
                     style={{height:44,borderRadius:5,background:CS[c2].bg,border:`1px solid ${CS[c2].border}`,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:1}}>
                    {d.leads>0||d.gasto>0?(
                     <>
                      <span style={{fontSize:13,fontWeight:700,color:CS[c2].accent,lineHeight:1}}>{d.leads}</span>
                      <span style={{fontSize:8,color:CS[c2].accent,opacity:.7}}>R${d.gasto}</span>
                      {d.leads>0&&<span style={{fontSize:7,color:CS[c2].accent,opacity:.6}}>{(d.gasto / d.leads).toFixed(0)}</span>}
                     </>
                    ):<span style={{color:T.muted2,fontSize:14}}>·</span>}
                   </div>
                  );
                 })}
                 {}
                 <div style={{fontFamily:"var(--font-d)",fontSize:15,fontWeight:800,textAlign:"center",color:totalL>0?T.accent:T.muted2}}>{totalL||"—"}</div>
                 <div style={{fontSize:10,textAlign:"center",color:T.muted}}>{totalG?`R$${totalG.toFixed(0)}`:"—"}</div>
                 <div 
                   style={{textAlign:"center",borderRadius:5,padding:"4px 2px",fontSize:11,fontWeight:600,background:cs.bg,color:cs.accent,border:`1px solid ${cs.border}`}}>{cpl?`R$${cpl.toFixed(2)}`:"—"}</div>
                </div>
               );
              })}
             </div>
            ))}
           </div>
          );
         })()}
        </div>
       );
      })()}

      {}
      {view==="history"&&null}

      {}
      {view==="products"&&(
       <div>
        {}
        {!selectedPlan&&(
         <div style={{marginBottom:24,background:T.bg1,border:`1px solid ${T.border}`,borderRadius:12,padding:"14px 16px"}}>
          <div style={{fontSize:10,fontWeight:700,color:T.muted,textTransform:"uppercase",letterSpacing:.5,marginBottom:10}}>Jornada INNOVA — do básico ao completo</div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(6,1fr)",gap:6}}>
           {INNOVA_PLANS.filter(p=>p.nivel).map((plan,i,arr)=>(
            <div key={plan.id} style={{position:"relative"}}>
             <div onClick={()=>setSelectedPlan(plan.id)}
              style={{padding:"10px 10px",background:`${plan.color}15`,border:`1px solid ${plan.color}40`,borderRadius:8,cursor:"pointer",textAlign:"center",transition:"all .15s",height:"100%"}}
              onMouseEnter={e=>{e.currentTarget.style.background=`${plan.color}30`;e.currentTarget.style.transform="translateY(-2px)";}}
              onMouseLeave={e=>{e.currentTarget.style.background=`${plan.color}15`;e.currentTarget.style.transform="translateY(0)";}}>
              <div style={{fontSize:8,fontWeight:800,color:plan.color,letterSpacing:.5,marginBottom:3}}>NÍV. {plan.nivel}</div>
              <div style={{fontSize:10,fontWeight:800,color:T.text,lineHeight:1.3,whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>{plan.name.replace("INNOVA ","")}</div>
              <div style={{fontSize:9,color:T.muted,marginTop:4}}>{clients.filter(c=>c.plan===plan.id).length} <span style={{opacity:.7}}>cli.</span></div>
             </div>
             {i!==arr.length-1&&(
              <div style={{position:"absolute",right:-7,top:"50%",transform:"translateY(-50%)",width:14,height:2,background:`linear-gradient(90deg,${plan.color},${arr[i+1].color})`,zIndex:2}}/>
             )}
            </div>
           ))}
          </div>
         </div>
        )}

        {}
        {!selectedPlan&&(
         <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(260px,1fr))",gap:12,marginBottom:32}}>
          {INNOVA_PLANS.map((plan,i)=>{const count=filtered.filter(c=>c.plan===plan.id).length;
           const OG="#f97316";
           return(
            <button key={plan.id} onClick={()=>setSelectedPlan(plan.id)}
             style={{background:"#080808",
              border:`1px solid ${OG}18`,borderLeft:`4px solid ${OG}`,
              borderRadius:12,padding:"18px 20px",cursor:"pointer",textAlign:"left",transition:"all .2s",
              animation:`fadeUp .3s ease ${i*.04}s both`,display:"flex",alignItems:"center",justifyContent:"space-between",
              boxShadow:`0 0 20px ${OG}06`,}}
             
               onMouseEnter={e=>{e.currentTarget.style.background="#0f0f0f";e.currentTarget.style.transform="translateY(-2px)";e.currentTarget.style.boxShadow=`0 8px 28px ${OG}20`;e.currentTarget.style.borderColor=`${OG}`;}}
             
               onMouseLeave={e=>{e.currentTarget.style.background="#080808";e.currentTarget.style.transform="translateY(0)";e.currentTarget.style.boxShadow=`0 0 20px ${OG}06`;e.currentTarget.style.borderColor=`${OG}`;e.currentTarget.style.borderLeftColor=OG;}}>
             <div>
              <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:6}}>
               {plan.nivel&&<span 
                 style={{fontSize:8,fontWeight:800,padding:"1px 6px",borderRadius:3,background:`${OG}20`,color:OG,letterSpacing:.5,fontFamily:"var(--font-d)"}}>NÍV.{plan.nivel}</span>}
               <span style={{fontFamily:"var(--font-d)",fontSize:13,fontWeight:900,color:"#fff",fontStyle:"italic",letterSpacing:-.3}}>{plan.name}</span>
              </div>
              <div style={{fontSize:10,color:"#555",maxWidth:200,lineHeight:1.4}}>{plan.objetivo}</div>
             </div>
             <div style={{textAlign:"center",flexShrink:0,marginLeft:16}}>
              <div style={{fontFamily:"var(--font-d)",fontSize:28,fontWeight:900,color:OG,lineHeight:1}}>{count}</div>
              <div style={{fontSize:9,color:"#444",letterSpacing:1,textTransform:"uppercase",marginTop:2}}>cli.</div>
             </div>
            </button>
           );
          })}
         </div>
        )}

        {}
        {selectedPlan&&(()=>{const plan=INNOVA_PLANS.find(p=>p.id===selectedPlan);
         if(!plan) return null;
         const planClients=filtered.filter(c=>c.plan===selectedPlan);
         const OG="#f97316";
         return(
          <div style={{animation:"fadeUp .3s ease"}}>
           {}
           <button onClick={()=>setSelectedPlan(null)} className="btn-sm" style={{marginBottom:20}}>← Voltar aos Planos</button>

           {}
           <div style={{
            display:"flex",flexDirection:"row",borderRadius:24,overflow:"hidden",border:"1px solid #ffffff0d",
            boxShadow:`0 0 60px ${OG}18`,marginBottom:28,minHeight:520,
           }}>
            {}
            <div style={{
             width:"38%",flexShrink:0,padding:"36px 32px",background:"linear-gradient(135deg,#121212 0%,#000 100%)",
             borderRight:"1px solid #ffffff0a",display:"flex",flexDirection:"column",justifyContent:"space-between",
            }}>
             <div>
              {}
              <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:36}}>
               <svg width="38" height="38" viewBox="0 0 100 100" fill="none">
                <path d="M20 35 L45 55 V85 L20 65 Z" fill="white"/>
                <path d="M80 65 L55 45 V15 L80 35 Z" fill="white"/>
                <path d="M45 55 L55 45 L55 58 L45 68 Z" fill="white"/>
               </svg>
               <span style={{fontSize:22,fontWeight:900,color:"#fff",letterSpacing:-1,fontFamily:"var(--font-d)"}}>INNOVA</span>
              </div>

              {}
              <div style={{display:"inline-flex",alignItems:"center",gap:6,background:`${OG}15`,border:`1px solid ${OG}30`,padding:"4px 12px",borderRadius:999,marginBottom:16}}>
               <span style={{fontSize:10,color:OG,fontWeight:800,letterSpacing:2,textTransform:"uppercase",fontFamily:"var(--font-d)"}}>
                {plan.nivel?`Produto Nível ${plan.nivel}`:plan.name}
               </span>
              </div>

              {}
              <div style={{fontFamily:"var(--font-d)",fontSize:52,fontWeight:900,fontStyle:"italic",color:"#fff",lineHeight:1,letterSpacing:-2,textTransform:"uppercase",marginBottom:12}}>
               {plan.name.replace("INNOVA ","").replace(" / ELITE","")}
              </div>

              {}
              <div style={{width:52,height:5,background:OG,borderRadius:3,boxShadow:`0 0 12px ${OG}80`,marginBottom:16}}/>

              {}
              <p style={{fontSize:13,color:"#888",lineHeight:1.6,maxWidth:220}}>{plan.objetivo}</p>
             </div>

             {}
             <div style={{display:"flex",alignItems:"center",gap:10,marginTop:32}}>
              <div style={{width:32,height:32,borderRadius:"50%",background:"#0d0d0d",border:"1px solid #222",display:"flex",alignItems:"center",justifyContent:"center"}}>
               <span style={{color:OG,fontSize:14}}>◎</span>
              </div>
              <span style={{fontSize:9,fontWeight:700,color:"#555",letterSpacing:3,textTransform:"uppercase",fontStyle:"italic",fontFamily:"var(--font-d)"}}>Performance & Tráfego</span>
             </div>
            </div>

            {}
            <div style={{
             flex:1,padding:"36px 32px",background:"#0a0a0a",
             display:"flex",flexDirection:"column",justifyContent:"space-between",}}>
             {}
             <div>
              <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:20}}>
               <div style={{height:1,width:20,background:OG}}/>
               <span style={{fontSize:9,fontWeight:800,letterSpacing:4,textTransform:"uppercase",color:OG,fontFamily:"var(--font-d)"}}>Escopo Detalhado</span>
              </div>
              <div style={{display:"flex",flexDirection:"column",gap:10}}>
               {plan.inclui.map((item,i)=>(
                <div key={i} style={{display:"flex",alignItems:"flex-start",gap:10}}>
                 <div style={{marginTop:2,flexShrink:0,width:16,height:16,borderRadius:"50%",border:`1.5px solid ${OG}`,display:"flex",alignItems:"center",justifyContent:"center"}}>
                  <span style={{color:OG,fontSize:9,fontWeight:800}}>✓</span>
                 </div>
                 <span style={{fontSize:12,color:"#e5e5e5",fontWeight:600,lineHeight:1.4,letterSpacing:-0.2}}>{item}</span>
                </div>
               ))}
              </div>
             </div>

             {}
             {plan.naoInclui.length>0&&(
              <div style={{marginTop:24,paddingTop:20,borderTop:"1px solid #ffffff08",display:"grid",gridTemplateColumns:"1fr 1fr",gap:16}}>
               <div>
                <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:8}}>
                 <span style={{color:`${OG}80`,fontSize:12}}>⚠</span>
                 <span style={{fontSize:8,fontWeight:800,textTransform:"uppercase",letterSpacing:2,color:"#666",fontFamily:"var(--font-d)"}}>Limitações</span>
                </div>
                {plan.naoInclui.slice(0,3).map((item,i)=>(
                 <div key={i} style={{fontSize:10,color:"#555",fontWeight:500,marginBottom:3}}>• {item}</div>
                ))}
               </div>
               <div>
                <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:8}}>
                 <span style={{color:"#444",fontSize:12}}>✕</span>
                 <span style={{fontSize:8,fontWeight:800,textTransform:"uppercase",letterSpacing:2,color:"#555",fontFamily:"var(--font-d)"}}>Não Inclui</span>
                </div>
                {plan.naoInclui.slice(3).map((item,i)=>(
                 <div key={i} style={{fontSize:10,color:"#444",fontWeight:500,marginBottom:3}}>• {item}</div>
                ))}
               </div>
              </div>
             )}

             {}
             {plan.upgrade&&(
              <div style={{
               marginTop:20,background:`linear-gradient(90deg,${OG}18,transparent)`,
               border:`1px solid ${OG}25`,borderRadius:16,padding:"14px 20px",
               display:"flex",alignItems:"center",justifyContent:"space-between",cursor:"pointer",transition:"border-color .2s",
              }}
              onMouseEnter={e=>e.currentTarget.style.borderColor=`${OG}60`}
              onMouseLeave={e=>e.currentTarget.style.borderColor=`${OG}25`}>
               <div style={{display:"flex",alignItems:"center",gap:14}}>
                <div style={{background:OG,padding:"8px",borderRadius:12,boxShadow:`0 4px 16px ${OG}40`}}>
                 <span style={{color:"#fff",fontSize:14}}>📈</span>
                </div>
                <div>
                 <div style={{fontSize:8,color:OG,fontWeight:900,letterSpacing:3,textTransform:"uppercase",fontFamily:"var(--font-d)"}}>Evolução Natural</div>
                 <div style={{fontSize:13,color:"#fff",fontWeight:700,fontFamily:"var(--font-d)",marginTop:1}}>Plano {plan.upgrade}</div>
                </div>
               </div>
               <span style={{color:OG,fontSize:18}}>→</span>
              </div>
             )}
            </div>
           </div>

           {}
           <div style={{fontFamily:"var(--font-d)",fontSize:13,fontWeight:700,marginBottom:14,color:T.text,display:"flex",alignItems:"center",gap:10}}>
            Clientes neste plano
            <span style={{fontSize:11,color:OG,background:`${OG}15`,border:`1px solid ${OG}30`,padding:"2px 10px",borderRadius:20,fontWeight:600}}>{planClients.length}</span>
           </div>
           {planClients.length===0?(
            <div style={{padding:"32px",textAlign:"center",color:T.muted2,fontSize:12,background:T.bg1,border:`1px solid ${T.border}`,borderRadius:10}}>
             Nenhum cliente neste plano ainda
            </div>
           ):(
            <div className="products-grid">
             {planClients.map((client,i)=>{const scope=client.scope||DEFAULT_SCOPE;
              return(
               <div key={client.id} className="product-card" style={{animationDelay:`${i*.03}s`,borderColor:`${OG}20`}}>
                <div className="product-card-header" style={{borderLeft:`3px solid ${OG}`}}>
                 <div>
                  <div className="product-card-name">{client.name}</div>
                  <div style={{fontSize:10,color:"var(--muted)",marginTop:2}}>Gestor: {client.manager}</div>
                 </div>
                 <div style={{display:"flex",gap:6}}>
                  {isAdmin&&<button className="edit-scope-btn" onClick={()=>{setView("clients");setSelectedClientEdit(client.id);}}>🗂 Cliente</button>}
                  <button className="edit-scope-btn" onClick={()=>setProductModal(client)}>✏️ Escopo</button>
                 </div>
                </div>
                <div className="product-card-body">
                 <div className="scope-row"><span className="scope-label">Plataformas</span>
                  <span className="scope-value">{scope.plataformas?.length>0?scope.plataformas.map(p=><span 
                    key={p} className="scope-tag platform">{p}</span>):<span 
                    style={{color:"var(--muted2)",fontSize:10}}>—</span>}</span>
                 </div>
                 <div className="scope-row"><span className="scope-label">Budget</span>
                  <span className="scope-value" style={{color:OG,fontWeight:600}}>{scope.budget||"—"}</span>
                 </div>
                 <div className="scope-row"><span className="scope-label">Campanhas</span>
                  <span className="scope-value">{scope.campanhas||"—"}</span>
                 </div>
                 <div className="scope-row"><span className="scope-label">Criativos</span>
                  <span className="scope-value">{scope.criativos||"—"}</span>
                 </div>
                 {scope.observacoes&&<div className="scope-row"><span className="scope-label">⚠ Obs.</span><span className="scope-value" 
                   style={{color:T.yellow,fontSize:11}}>{scope.observacoes}</span></div>}
                </div>
               </div>
              );
             })}
            </div>
           )}
          </div>
         );
        })()}
       </div>
      )}

      {}
      {view==="results"&&(()=>{
       const MONTHS=["Janeiro","Fevereiro","Março","Abril","Maio","Junho","Julho","Agosto","Setembro","Outubro","Novembro","Dezembro"];
       const EMPTY_MONTH={investimento_google:"",investimento_meta:"",
        leads_google:"",leads_meta:"",cpa_google:"",cpa_meta:"",
        vendas:"",ticket_medio:"",valor_vendido:"",roas:"",clientes_google_mes:"",clientes_meta_mes:"",
        clientes_google_ant:"",clientes_meta_ant:"",indicacao:"",recompra:"",rec_mortos:"",
        venda_google_mes:"",venda_meta_mes:"",venda_google_ant:"",venda_meta_ant:"",
        venda_indicacao:"",venda_recompra:"",venda_rec_mortos:"",observacoes:"",

        reunioes:[],};

       function getClientAge(entryDate){if(!entryDate) return null;
        const entry=new Date(entryDate);
        const now=new Date();
        const totalMonths=(now.getFullYear()-entry.getFullYear())*12+(now.getMonth()-entry.getMonth());
        const years=Math.floor(totalMonths / 12);
        const months=totalMonths%12;
        if(years>0) return `${years}a ${months}m`;
        return `${months} mês${months!==1?"es":""}`;
       }

       function calcLTV(clientId){const months=clientResults[clientId]?.months||{};
        return Object.values(months).reduce((s,m)=>s+(parseFloat(m.valor_vendido)||0),0);
       }

       function calcROAS(m){const inv=(parseFloat(m.investimento_google)||0)+(parseFloat(m.investimento_meta)||0);
        const vend=parseFloat(m.valor_vendido)||0;
        return inv>0?(vend / inv).toFixed(2):"—";
       }

       const fmtR=(v)=>v?`R$ ${parseFloat(v).toLocaleString("pt-BR",{minimumFractionDigits:2})}`:"—";
       const filtClients=filtered;

       if(selectedResultClient){const client=clients.find(c=>c.id===selectedResultClient);
        if(!client) return null;
        const cr=clientResults[client.id]||{months:{},entryDate:""};
        const age=getClientAge(resultEntryDate[client.id]||cr.entryDate);
        const ltv=calcLTV(client.id);
        const plan=INNOVA_PLANS.find(p=>p.id===client.plan);
        const monthKeys=Object.keys(cr.months).sort((a,b)=>{const [ya,ma]=a.split("-").map(Number);
         const [yb,mb]=b.split("-").map(Number);
         return ya!==yb?ya-yb:ma-mb;
        });

        const summaryRows=monthKeys.map(k=>{const m=cr.months[k];
         const [year,mon]=k.split("-");
         const label=`${MONTHS[parseInt(mon)-1]} ${year}`;
         const inv=(parseFloat(m.investimento_google)||0)+(parseFloat(m.investimento_meta)||0);
         const vend=parseFloat(m.valor_vendido)||0;
         const roas=inv>0?(vend / inv).toFixed(2):"—";
         return{k,label,inv,vend,roas};
        });
        const totalInv=summaryRows.reduce((s,r)=>s+r.inv,0);
        const totalVend=summaryRows.reduce((s,r)=>s+r.vend,0);
        const totalRoas=totalInv>0?(totalVend / totalInv).toFixed(2):"—";

        return(
         <div style={{animation:"fadeUp .3s ease"}}>
          {}
          <div style={{display:"flex",alignItems:"flex-start",gap:16,marginBottom:24}}>
           <button onClick={()=>setSelectedResultClient(null)} className="btn-sm">← Voltar</button>
           <div style={{flex:1}}>
            <div style={{display:"flex",alignItems:"center",gap:12,flexWrap:"wrap"}}>
             <div style={{fontFamily:"var(--font-d)",fontSize:20,fontWeight:800,color:T.text}}>{client.name}</div>
             {plan&&<span 
               style={{fontSize:11,fontWeight:600,padding:"3px 10px",borderRadius:20,background:`${plan.color}18`,color:plan.color,border:`1px solid ${plan.color}30`}}>{plan.dot} {plan.name}</span>}
             {age&&<span style={{fontSize:11,color:T.muted,background:T.bg2,border:`1px solid ${T.border}`,padding:"3px 10px",borderRadius:20}}>🕐 {age} conosco</span>}
             {ltv>0&&<span 
               style={{fontSize:11,fontWeight:700,color:T.green,background:`${T.green}15`,border:`1px solid ${T.green}30`,padding:"3px 10px",borderRadius:20}}>LTV R${ltv.toLocaleString("pt-BR",{minimumFractionDigits:2})}</span>}
            </div>
            <div style={{display:"flex",gap:16,marginTop:8,flexWrap:"wrap"}}>
             <div style={{display:"flex",alignItems:"center",gap:8}}>
              <span style={{fontSize:12,color:T.muted}}>Data de entrada:</span>
              {isAdmin?(
               <input type="date" 
                 value={client.info?.entryDate||resultEntryDate[client.id]||cr.entryDate||""} 
                 style={{background:T.bg2,border:`1px solid ${T.border}`,borderRadius:6,color:T.text,padding:"4px 10px",fontSize:12,fontFamily:"var(--font-d)",outline:"none"}}
                onChange={e=>{
                 setClients(prev=>prev.map(c=>c.id===client.id?{...c,info:{...(c.info||DEFAULT_CLIENT_INFO),entryDate:e.target.value}}:c));
                 setResultEntryDate(p=>({...p,[client.id]:e.target.value}));
                }}/>
              ):(
               <span style={{fontSize:12,color:T.text,fontWeight:600}}>{client.info?.entryDate||cr.entryDate||"—"}</span>
              )}
             </div>
             <div style={{display:"flex",gap:6}}>
              {client.platforms.map(({p})=><span key={p} className={`platform-badge ${p}`}>{P_LABEL[p]}</span>)}
             </div>
            </div>
           </div>
           <button className="btn-accent" onClick={()=>{
            const now=new Date();
            const k=`${now.getFullYear()}-${String(now.getMonth()+1).padStart(2,"0")}`;
            setResultEditMonth(k);
            setResultMonthForm(cr.months[k]||{...EMPTY_MONTH});
           }}>+ Novo Mês</button>
          </div>

          {}
          {resultEditMonth&&(
           <div className="modal-overlay" onClick={()=>setResultEditMonth(null)}>
            <div className="modal modal-lg" onClick={e=>e.stopPropagation()} style={{maxHeight:"92vh",overflowY:"auto",width:720}}>
             {}
             <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:16}}>
              <div className="modal-title" style={{marginBottom:0}}>
               {(()=>{const[y,m]=resultEditMonth.split("-");return`${MONTHS[parseInt(m)-1]} ${y}`;})()}
              </div>
              <div style={{display:"flex",gap:8,alignItems:"center"}}>
               <select style={{background:T.bg2,border:`1px solid ${T.border2}`,borderRadius:6,color:T.text,padding:"6px 10px",fontSize:12,fontFamily:"var(--font-d)",outline:"none"}}
                value={resultEditMonth.split("-")[1]}
                onChange={e=>{const[y]=resultEditMonth.split("-");const k=`${y}-${e.target.value}`;setResultEditMonth(k);setResultMonthForm(cr.months[k]||{...EMPTY_MONTH});}}>
                {MONTHS.map((m,i)=><option key={i} value={String(i+1).padStart(2,"0")}>{m}</option>)}
               </select>
               <select style={{background:T.bg2,border:`1px solid ${T.border2}`,borderRadius:6,color:T.text,padding:"6px 10px",fontSize:12,fontFamily:"var(--font-d)",outline:"none"}}
                value={resultEditMonth.split("-")[0]}
                onChange={e=>{const[,m]=resultEditMonth.split("-");const k=`${e.target.value}-${m}`;setResultEditMonth(k);setResultMonthForm(cr.months[k]||{...EMPTY_MONTH});}}>
                {[2023,2024,2025,2026].map(y=><option key={y}>{y}</option>)}
               </select>
              </div>
             </div>
             <div style={{fontSize:11,color:T.muted,marginBottom:20}}>{client.name} · campos com 🔒 são calculados automaticamente</div>

             {}
             <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,marginBottom:16}}>
              {}
              <div style={{background:T.bg2,borderRadius:10,overflow:"hidden",border:`1px solid ${T.border}`}}>
               <div style={{background:"#166534",padding:"8px 14px",fontWeight:700,fontSize:12,color:"#fff",letterSpacing:.5}}>GERAL DO MÊS</div>
               {(()=>{const invG=parseFloat(resultMonthForm.investimento_google)||0;
                const invM=parseFloat(resultMonthForm.investimento_meta)||0;
                const invTotal=invG+invM;
                const vendasN=parseFloat(resultMonthForm.vendas)||0;
                const vlVend=parseFloat(resultMonthForm.valor_vendido)||0;
                const ticketAuto=vendasN>0?(vlVend / vendasN).toFixed(2):0;
                const roasAuto=invTotal>0?(vlVend / invTotal).toFixed(2):0;

                if(resultMonthForm.ticket_medio===undefined||resultMonthForm.ticket_medio===""){
                 setTimeout(()=>setResultMonthForm(p=>({...p,ticket_medio:ticketAuto,roas:roasAuto})),0);
                }
                return[["INVESTIMENTO TOTAL",`R$ ${invTotal.toFixed(2)}`,true],
                 ["CPA GOOGLE",resultMonthForm.cpa_google?`R$ ${parseFloat(resultMonthForm.cpa_google).toFixed(2)}`:"-",true],
                 ["CPA META",resultMonthForm.cpa_meta?`R$ ${parseFloat(resultMonthForm.cpa_meta).toFixed(2)}`:"-",true],
                 ["VENDAS",resultMonthForm.vendas||"-",false],["TICKET MÉDIO 🔒",vlVend&&vendasN?`R$ ${ticketAuto}`:"-",true],
                 ["VALOR VENDIDO",null,false],["ROAS 🔒",roasAuto||"-",true],
                ].map(([l,autoV,isAuto],i)=>(
                 <div key={l} style={{display:"grid",gridTemplateColumns:"1fr 1fr",borderBottom:i<6?`1px solid ${T.border}80`:"none"}}>
                  <div style={{padding:"7px 14px",fontSize:11,color:T.muted,fontWeight:600,background:T.bg3}}>{l}</div>
                  <div style={{padding:"5px 8px"}}>
                   {isAuto
                    ?<div style={{padding:"4px 8px",fontSize:12,color:T.accent,fontWeight:700}}>{autoV}</div>
                    :<input type="number" placeholder="0"
                     value={l==="VALOR VENDIDO"?resultMonthForm.valor_vendido||"":resultMonthForm.vendas||""}
                     onChange={e=>{const field=l==="VALOR VENDIDO"?"valor_vendido":"vendas";
                      setResultMonthForm(p=>{const upd={...p,[field]:e.target.value};
                       const vn=parseFloat(l==="VENDAS"?e.target.value:p.vendas)||0;
                       const vv=parseFloat(l==="VALOR VENDIDO"?e.target.value:p.valor_vendido)||0;
                       const inv=(parseFloat(p.investimento_google)||0)+(parseFloat(p.investimento_meta)||0);
                       upd.ticket_medio=vn>0?(vv / vn).toFixed(2):"";
                       upd.roas=inv>0?(vv / inv).toFixed(2):"";
                       return upd;
                      });
                     }}
                     style={{width:"100%",background:"none",border:`1px solid ${T.border}`,borderRadius:5,color:T.text,padding:"4px 8px",fontSize:12,fontFamily:"var(--font-m)",outline:"none"}}/>}
                  </div>
                 </div>
                ));
               })()}
              </div>

              {}
              <div style={{display:"flex",flexDirection:"column",gap:12}}>
               {[{plat:"Meta Ads",col:"#1d4ed8",inv:"investimento_meta",leads:"leads_meta",cpa:"cpa_meta"},{plat:"Google Ads",col:"#166534",inv:"investimento_google",leads:"leads_google",cpa:"cpa_google"}].map(({plat,col,inv,leads,cpa})=>(
                <div key={plat} style={{background:T.bg2,borderRadius:10,overflow:"hidden",border:`1px solid ${T.border}`,flex:1}}>
                 <div style={{background:col,padding:"8px 14px",fontWeight:700,fontSize:12,color:"#fff"}}>{plat.toUpperCase()}</div>
                 {[["INVESTIMENTO",inv],["LEADS",leads],["CPA 🔒",cpa]].map(([l,field],i)=>{const isAutoCpa=l.includes("🔒");
                  const autoCpa=(()=>{const li=parseFloat(resultMonthForm[leads])||0;
                   const gi=parseFloat(resultMonthForm[inv])||0;
                   return li>0?(gi / li).toFixed(2):"—";
                  })();
                  return(
                   <div key={l} style={{display:"grid",gridTemplateColumns:"1fr 1fr",borderBottom:i<2?`1px solid ${T.border}80`:"none"}}>
                    <div style={{padding:"7px 14px",fontSize:11,color:T.muted,fontWeight:600,background:T.bg3}}>{l}</div>
                    <div style={{padding:"5px 8px"}}>
                     {isAutoCpa
                      ?<div style={{padding:"4px 8px",fontSize:12,color:T.accent,fontWeight:700}}>{autoCpa!=="—"?`R$ ${autoCpa}`:autoCpa}</div>
                      :<input type="number" placeholder="0"
                       value={resultMonthForm[field]||""}
                       onChange={e=>{setResultMonthForm(p=>{
                         const upd={...p,[field]:e.target.value};

                         const li2=parseFloat(field===leads?e.target.value:p[leads])||0;
                         const gi2=parseFloat(field===inv?e.target.value:p[inv])||0;
                         upd[cpa]=li2>0?(gi2 / li2).toFixed(2):"";

                         const totalInv=(parseFloat(field===inv?e.target.value:p[inv])||0)+
                          (parseFloat(inv==="investimento_google"?p.investimento_meta:p.investimento_google)||0);
                         const vv=parseFloat(p.valor_vendido)||0;
                         upd.roas=totalInv>0?(vv / totalInv).toFixed(2):"";
                         return upd;
                        });
                       }}
                       style={{width:"100%",background:"none",border:`1px solid ${T.border}`,borderRadius:5,color:T.text,padding:"4px 8px",fontSize:12,fontFamily:"var(--font-m)",outline:"none"}}/>}
                    </div>
                   </div>
                  );
                 })}
                </div>
               ))}
              </div>
             </div>

             {}
             {(()=>{
              const leads=(parseFloat(resultMonthForm.leads_google)||0)+(parseFloat(resultMonthForm.leads_meta)||0);
              const vendas=parseFloat(resultMonthForm.vendas)||0;
              const taxa=leads>0?(vendas / leads*100).toFixed(2):"—";
              return taxa!=="—"&&(
               <div style={{background:`${T.green}15`,border:`1px solid ${T.green}30`,borderRadius:8,padding:"10px 16px",marginBottom:16,display:"flex",alignItems:"center",gap:10}}>
                <span style={{fontWeight:800,fontSize:13,color:T.green}}>TAXA DE CONVERSÃO = {taxa}%</span>
                <span style={{fontSize:11,color:T.muted}}>({leads} leads → {vendas} vendas)</span>
               </div>
              );
             })()}

             {}
             <div style={{background:T.bg2,borderRadius:10,overflow:"hidden",border:`1px solid ${T.border}`,marginBottom:16}}>
              <div style={{background:"#374151",padding:"8px 14px",fontWeight:700,fontSize:11,color:"#fff",letterSpacing:.5,display:"flex",gap:16}}>
               <span>ORIGEM DAS VENDAS</span>
               <span style={{opacity:.6,fontWeight:400}}>— preencha clientes e valor de cada canal</span>
              </div>
              <div style={{overflowX:"auto"}}>
               <table style={{width:"100%",borderCollapse:"collapse",fontSize:11}}>
                <thead>
                 <tr style={{background:T.bg3}}>
                  {["","Google Mês","Meta Mês","Google Ant.","Meta Ant.","Indicação","Recompra","Rec. Mortos"].map(h=>(
                   <th key={h} style={{padding:"8px 10px",color:T.muted,fontWeight:700,fontSize:10,textAlign:"center",borderBottom:`1px solid ${T.border}`,whiteSpace:"nowrap"}}>{h}</th>
                  ))}
                 </tr>
                </thead>
                <tbody>
                 {[
                  {row:"Clientes",keys:["clientes_google_mes","clientes_meta_mes","clientes_google_ant","clientes_meta_ant","indicacao","recompra","rec_mortos"]},
                  {row:"Valor R$",keys:["venda_google_mes","venda_meta_mes","venda_google_ant","venda_meta_ant","venda_indicacao","venda_recompra","venda_rec_mortos"]},
                 ].map(({row,keys})=>(
                  <tr key={row} style={{borderBottom:`1px solid ${T.border}50`}}>
                   <td style={{padding:"6px 14px",fontWeight:700,color:T.text,background:T.bg3,whiteSpace:"nowrap",fontSize:11}}>{row}</td>
                   {keys.map(k=>(
                    <td key={k} style={{padding:"4px 6px",textAlign:"center"}}>
                     <input type="number" placeholder="0"
                      value={resultMonthForm[k]||""}
                      onChange={e=>{setResultMonthForm(p=>{
                        const upd={...p,[k]:e.target.value};
                        const cliKeys=["clientes_google_mes","clientes_meta_mes","clientes_google_ant","clientes_meta_ant","indicacao","recompra","rec_mortos"];
                        const valKeys=["venda_google_mes","venda_meta_mes","venda_google_ant","venda_meta_ant","venda_indicacao","venda_recompra","venda_rec_mortos"];

                        const totalVendas=cliKeys.reduce((s,ck)=>s+(parseFloat(ck===k?e.target.value:p[ck])||0),0);

                        const totalValor=valKeys.reduce((s,vk)=>s+(parseFloat(vk===k?e.target.value:p[vk])||0),0);
                        upd.vendas=totalVendas||"";
                        upd.valor_vendido=totalValor||"";

                        const inv=(parseFloat(p.investimento_google)||0)+(parseFloat(p.investimento_meta)||0);
                        upd.ticket_medio=totalVendas>0?(totalValor / totalVendas).toFixed(2):"";
                        upd.roas=inv>0?(totalValor / inv).toFixed(2):"";
                        return upd;
                       });
                      }}
                      
                        style={{width:"72px",background:T.bg1,border:`1px solid ${T.border}`,borderRadius:5,color:T.text,padding:"5px 6px",fontSize:11,fontFamily:"var(--font-m)",outline:"none",textAlign:"right"}}/>
                    </td>
                   ))}
                  </tr>
                 ))}
                 {}
                 {(()=>{
                  const clKeys=["clientes_google_mes","clientes_meta_mes","clientes_google_ant","clientes_meta_ant","indicacao","recompra","rec_mortos"];
                  const total=clKeys.reduce((s,k)=>s+(parseFloat(resultMonthForm[k])||0),0);
                  return total>0&&(
                   <tr style={{background:T.bg3}}>
                    <td style={{padding:"6px 14px",fontWeight:700,color:T.muted,fontSize:10}}>% 🔒</td>
                    {clKeys.map(k=>{const v=parseFloat(resultMonthForm[k])||0;
                     const pct=total>0?(v / total*100).toFixed(1):"—";
                     return <td key={k} style={{padding:"4px 6px",textAlign:"center",fontFamily:"var(--font-m)",fontSize:10,color:T.accent,fontWeight:600}}>{pct!=="—"?`${pct}%`:"—"}</td>;
                    })}
                   </tr>
                  );
                 })()}
                </tbody>
               </table>
              </div>
             </div>

             {}
             <div style={{background:T.bg2,borderRadius:10,overflow:"hidden",border:`1px solid ${T.border}`,marginBottom:16}}>
              <div style={{background:"#7c3aed",padding:"8px 14px",fontWeight:700,fontSize:11,color:"#fff",letterSpacing:.5,display:"flex",alignItems:"center",justifyContent:"space-between"}}>
               <span>🎥 REUNIÕES DO MÊS</span>
               <button onClick={()=>{
                const now=new Date();
                const newR={id:Date.now(),date:now.toISOString().split("T")[0],time:now.toTimeString().slice(0,5),link:"",duration_min:"",notes:""};
                setResultMonthForm(p=>({...p,reunioes:[...(p.reunioes||[]),newR]}));
               }} style={{background:"rgba(255,255,255,.15)",border:"none",color:"#fff",padding:"3px 10px",borderRadius:20,cursor:"pointer",fontSize:11,fontFamily:"var(--font-d)",fontWeight:600}}>
                + Adicionar
               </button>
              </div>
              {(resultMonthForm.reunioes||[]).length===0?(
               <div style={{padding:"16px",textAlign:"center",fontSize:11,color:T.muted}}>Nenhuma reunião registrada · clique em + Adicionar</div>
              ):(
               <div>
                {(resultMonthForm.reunioes||[]).map((r,ri)=>(
                 <div key={r.id||ri} style={{padding:"12px 14px",borderBottom:ri<(resultMonthForm.reunioes.length-1)?`1px solid ${T.border}`:"none"}}>
                  <div style={{display:"grid",gridTemplateColumns:"130px 80px 1fr 90px",gap:8,marginBottom:8}}>
                   <div>
                    <label style={{fontSize:9,fontWeight:700,color:T.muted,textTransform:"uppercase",display:"block",marginBottom:3}}>Data</label>
                    <input type="date" value={r.date||""} onChange={e=>setResultMonthForm(p=>({...p,reunioes:p.reunioes.map((x,i)=>i===ri?{...x,date:e.target.value}:x)}))}
                     style={{width:"100%",background:T.bg1,border:`1px solid ${T.border}`,borderRadius:5,color:T.text,padding:"5px 7px",fontSize:11,fontFamily:"var(--font-d)",outline:"none"}}/>
                   </div>
                   <div>
                    <label style={{fontSize:9,fontWeight:700,color:T.muted,textTransform:"uppercase",display:"block",marginBottom:3}}>Hora</label>
                    <input type="time" value={r.time||""} onChange={e=>setResultMonthForm(p=>({...p,reunioes:p.reunioes.map((x,i)=>i===ri?{...x,time:e.target.value}:x)}))}
                     style={{width:"100%",background:T.bg1,border:`1px solid ${T.border}`,borderRadius:5,color:T.text,padding:"5px 7px",fontSize:11,fontFamily:"var(--font-d)",outline:"none"}}/>
                   </div>
                   <div>
                    <label style={{fontSize:9,fontWeight:700,color:T.muted,textTransform:"uppercase",display:"block",marginBottom:3}}>Link da Gravação</label>
                    <input type="url" placeholder="https://..." value={r.link||""} onChange={e=>setResultMonthForm(p=>({...p,reunioes:p.reunioes.map((x,i)=>i===ri?{...x,link:e.target.value}:x)}))}
                     style={{width:"100%",background:T.bg1,border:`1px solid ${T.border}`,borderRadius:5,color:T.accent,padding:"5px 7px",fontSize:11,fontFamily:"var(--font-d)",outline:"none"}}/>
                   </div>
                   <div>
                    <label style={{fontSize:9,fontWeight:700,color:T.muted,textTransform:"uppercase",display:"block",marginBottom:3}}>Duração (min)</label>
                    <input type="number" placeholder="60" 
                      value={r.duration_min||""} 
                      onChange={e=>setResultMonthForm(p=>({...p,reunioes:p.reunioes.map((x,i)=>i===ri?{...x,duration_min:e.target.value}:x)}))}
                     style={{width:"100%",background:T.bg1,border:`1px solid ${T.border}`,borderRadius:5,color:T.text,padding:"5px 7px",fontSize:11,fontFamily:"var(--font-m)",outline:"none"}}/>
                   </div>
                  </div>
                  <div style={{display:"flex",gap:8,alignItems:"flex-end"}}>
                   <div style={{flex:1}}>
                    <label style={{fontSize:9,fontWeight:700,color:T.muted,textTransform:"uppercase",display:"block",marginBottom:3}}>Comentários / Pauta</label>
                    <input type="text" placeholder="Pauta ou observações da reunião..." 
                      value={r.notes||""} 
                      onChange={e=>setResultMonthForm(p=>({...p,reunioes:p.reunioes.map((x,i)=>i===ri?{...x,notes:e.target.value}:x)}))}
                     style={{width:"100%",background:T.bg1,border:`1px solid ${T.border}`,borderRadius:5,color:T.text,padding:"5px 7px",fontSize:11,fontFamily:"var(--font-d)",outline:"none"}}/>
                   </div>
                   <button onClick={()=>setResultMonthForm(p=>({...p,reunioes:p.reunioes.filter((_,i)=>i!==ri)}))}
                    
                      style={{background:"none",border:`1px solid ${T.red}40`,color:T.red,padding:"5px 10px",borderRadius:5,cursor:"pointer",fontSize:11,fontFamily:"var(--font-d)",fontWeight:600,whiteSpace:"nowrap"}}>
                    ✕ Remover
                   </button>
                  </div>
                 </div>
                ))}
                <div style={{padding:"8px 14px",background:T.bg3,display:"flex",alignItems:"center",gap:10,fontSize:11,color:T.muted}}>
                 <span>Total do mês:</span>
                 <span style={{fontWeight:700,color:T.accent}}>
                  {(resultMonthForm.reunioes||[]).length} reunião(ões) · {(resultMonthForm.reunioes||[]).reduce((s,r)=>s+(parseFloat(r.duration_min)||0),0)} min ({((resultMonthForm.reunioes||[]).reduce((s,r)=>s+(parseFloat(r.duration_min)||0),0)*100 / 6000).toFixed(1)}h)
                 </span>
                </div>
               </div>
              )}
             </div>

             {}
             <label className="field-label">Observações da Reunião</label>
             <textarea className="field-input" placeholder="Contexto, pontos de atenção, próximas ações..." 
               value={resultMonthForm.observacoes||""} 
               onChange={e=>setResultMonthForm(p=>({...p,observacoes:e.target.value}))} 
               style={{marginBottom:16}}/>

             <div style={{display:"flex",gap:10}}>
              <button className="btn-accent" style={{flex:1}} onClick={()=>{
               setClientResults(p=>({...p,[client.id]:{...p[client.id],months:{...p[client.id]?.months,[resultEditMonth]:resultMonthForm}}}));
               setResultEditMonth(null);
               showToast("✅","Resultados salvos");
              }}>Salvar</button>
              <button className="btn-sm" style={{flex:1}} onClick={()=>setResultEditMonth(null)}>Cancelar</button>
             </div>
            </div>
           </div>
          )}

          {}
          {monthKeys.length===0?(
           <div style={{textAlign:"center",padding:"60px 0",color:T.muted2}}>
            <div style={{fontSize:40,marginBottom:12,opacity:.4}}>📊</div>
            <div style={{fontFamily:"var(--font-d)",fontSize:14,fontWeight:700,marginBottom:6}}>Nenhum resultado registrado</div>
            <div style={{fontSize:12}}>Clique em "+ Novo Mês" para começar</div>
           </div>
          ):(
           <>
            {}
            {[...monthKeys].reverse().map(k=>{const m=cr.months[k];
             const[year,mon]=k.split("-");
             const label=`${MONTHS[parseInt(mon)-1]} ${year}`;
             const invTotal=(parseFloat(m.investimento_google)||0)+(parseFloat(m.investimento_meta)||0);
             const roas=m.roas||calcROAS(m);
             return(
              <div key={k} style={{background:T.bg1,border:`1px solid ${T.border}`,borderRadius:14,overflow:"hidden",marginBottom:16,animation:"fadeUp .3s ease"}}>
               {}
               <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"14px 20px",background:T.bg2,borderBottom:`1px solid ${T.border}`}}>
                <div style={{fontFamily:"var(--font-d)",fontSize:15,fontWeight:800,color:T.text}}>{label}</div>
                <div style={{display:"flex",gap:8}}>
                 <button className="edit-scope-btn" onClick={()=>{setResultEditMonth(k);setResultMonthForm({...EMPTY_MONTH,...m});}}>✏️ Editar</button>
                 <button className="edit-scope-btn" style={{color:T.red,borderColor:`${T.red}40`}} onClick={()=>{
                  setClientResults(p=>{const copy={...p[client.id].months};delete copy[k];return{...p,[client.id]:{...p[client.id],months:copy}};});
                  showToast("🗑️","Mês removido");
                 }}>✕</button>
                </div>
               </div>

               {}
               <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:0,borderBottom:`1px solid ${T.border}`}}>
                {[{l:"Investimento Total",v:fmtR(invTotal||null),c:T.accent},
                 {l:"Vendas",v:m.vendas||"—",c:T.text},{l:"Valor Vendido",v:fmtR(m.valor_vendido),c:T.green},
                 {l:"ROAS",v:roas,c:parseFloat(roas)>=5?T.green:parseFloat(roas)>=2?T.yellow:T.red},].map(({l,v,c},i)=>(
                 <div key={l} style={{padding:"16px 20px",borderRight:i<3?`1px solid ${T.border}`:"none",textAlign:"center"}}>
                  <div style={{fontSize:10,color:T.muted,fontWeight:600,textTransform:"uppercase",letterSpacing:.5,marginBottom:6}}>{l}</div>
                  <div style={{fontFamily:"var(--font-d)",fontSize:20,fontWeight:800,color:c}}>{v}</div>
                 </div>
                ))}
               </div>

               {}
               <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:0,borderBottom:`1px solid ${T.border}`}}>
                {[{p:"google",inv:m.investimento_google,leads:m.leads_google,cpa:m.cpa_google},{p:"meta",inv:m.investimento_meta,leads:m.leads_meta,cpa:m.cpa_meta}].map(({p,inv,leads,cpa},i)=>(
                 (inv||leads||cpa)?(
                  <div key={p} style={{padding:"12px 20px",borderRight:i===0?`1px solid ${T.border}`:"none"}}>
                   <div style={{marginBottom:8}}><span className={`platform-badge ${p}`}>{P_LABEL[p]}</span></div>
                   <div style={{display:"flex",gap:20}}>
                    {[[`Inv.`,fmtR(inv)],[`Leads`,leads||"—"],[`CPA`,fmtR(cpa)]].map(([l,v])=>(
                     <div 
                       key={l}><div 
                       style={{fontSize:9,color:T.muted,fontWeight:600,textTransform:"uppercase"}}>{l}</div><div 
                       style={{fontSize:13,fontWeight:700,color:T.text,marginTop:2}}>{v}</div></div>
                    ))}
                   </div>
                  </div>
                 ):null
                ))}
               </div>

               {}
               {(m.clientes_google_mes||m.clientes_meta_mes||m.indicacao||m.recompra||m.rec_mortos)&&(
                <div style={{padding:"12px 20px",overflowX:"auto"}}>
                 <div style={{fontSize:10,color:T.muted,fontWeight:600,textTransform:"uppercase",letterSpacing:.5,marginBottom:10}}>Origem das Vendas</div>
                 <table style={{width:"100%",borderCollapse:"collapse",fontSize:11}}>
                  <thead>
                   <tr>
                    {["","Google Mês","Meta Mês","Google Ant.","Meta Ant.","Indicação","Recompra","Rec. Mortos"].map(h=>(
                     <th 
                       key={h} 
                       style={{padding:"6px 10px",textAlign:"right",color:T.muted,fontWeight:600,fontSize:10,textTransform:"uppercase",letterSpacing:.3,borderBottom:`1px solid ${T.border}`,whiteSpace:"nowrap"}}>{h}</th>
                    ))}
                   </tr>
                  </thead>
                  <tbody>
                   {[["Clientes","clientes_google_mes","clientes_meta_mes","clientes_google_ant","clientes_meta_ant","indicacao","recompra","rec_mortos"],
                    ["Valor (R$)","venda_google_mes","venda_meta_mes","venda_google_ant","venda_meta_ant","venda_indicacao","venda_recompra","venda_rec_mortos"]].map(([rowL,...keys])=>(
                    <tr key={rowL} style={{borderBottom:`1px solid ${T.border}80`}}>
                     <td style={{padding:"8px 10px",fontWeight:700,color:T.text,fontSize:11}}>{rowL}</td>
                     {keys.map(k=>{const v=m[k];
                      const isVal=rowL==="Valor (R$)";
                      const total=keys.filter((_,i)=>i<4).reduce((s,ki)=>s+(parseFloat(m[ki])||0),0)+
                            (parseFloat(m[keys[4]])||0)+(parseFloat(m[keys[5]])||0)+(parseFloat(m[keys[6]])||0);
                      const pct=total>0&&v?((parseFloat(v) / total)*100).toFixed(1)+"%" :"";
                      return(
                       <td key={k} style={{padding:"8px 10px",textAlign:"right",color:T.text,fontFamily:"var(--font-m)",fontSize:11}}>
                        {isVal?fmtR(v):(v||"—")}
                        {!isVal&&v&&total>0&&<div style={{fontSize:9,color:T.muted}}>{pct}</div>}
                       </td>
                      );
                     })}
                    </tr>
                   ))}
                  </tbody>
                 </table>
                </div>
               )}

               {}
               {m.observacoes&&(
                <div style={{padding:"10px 20px",background:`${T.yellow}08`,borderTop:`1px solid ${T.border}`}}>
                 <span style={{fontSize:10,fontWeight:700,color:T.yellow,textTransform:"uppercase",letterSpacing:.5}}>📝 Obs: </span>
                 <span style={{fontSize:11,color:T.text}}>{m.observacoes}</span>
                </div>
               )}
              </div>
             );
            })}

            {}
            {summaryRows.length>1&&(
             <div style={{background:T.bg1,border:`1px solid ${T.border}`,borderRadius:14,overflow:"hidden",marginTop:8}}>
              <div style={{padding:"14px 20px",background:T.bg2,borderBottom:`1px solid ${T.border}`,fontFamily:"var(--font-d)",fontSize:14,fontWeight:700}}>
               📈 Histórico Consolidado
              </div>
              <div style={{overflowX:"auto",padding:"0 0 0 0"}}>
               <table style={{width:"100%",borderCollapse:"collapse"}}>
                <thead>
                 <tr style={{background:T.bg3}}>
                  {["Mês","Investido","Vendido","ROAS"].map(h=>(
                   <th 
                     key={h} 
                     style={{padding:"10px 20px",fontSize:10,fontWeight:700,color:T.muted,textTransform:"uppercase",letterSpacing:.5,textAlign:h==="Mês"?"left":"right",borderBottom:`1px solid ${T.border}`}}>{h}</th>
                  ))}
                 </tr>
                </thead>
                <tbody>
                 {summaryRows.map(row=>{const roasNum=parseFloat(row.roas);
                  const roasColor=roasNum>=5?T.green:roasNum>=2?T.yellow:T.red;
                  return(
                   <tr 
                     key={row.k} 
                     style={{borderBottom:`1px solid ${T.border}80`,cursor:"pointer"}} 
                     onClick={()=>{setResultEditMonth(row.k);setResultMonthForm({...EMPTY_MONTH,...cr.months[row.k]});}}>
                    <td style={{padding:"12px 20px",fontFamily:"var(--font-d)",fontWeight:600,fontSize:13,color:T.text}}>{row.label}</td>
                    <td style={{padding:"12px 20px",textAlign:"right",fontFamily:"var(--font-m)",color:T.accent,fontSize:12}}>{fmtR(row.inv||null)}</td>
                    <td style={{padding:"12px 20px",textAlign:"right",fontFamily:"var(--font-m)",color:T.green,fontSize:12,fontWeight:700}}>{fmtR(row.vend||null)}</td>
                    <td style={{padding:"12px 20px",textAlign:"right"}}>
                     <span style={{fontFamily:"var(--font-d)",fontSize:13,fontWeight:800,color:roasColor}}>{row.roas}</span>
                    </td>
                   </tr>
                  );
                 })}
                </tbody>
                <tfoot>
                 <tr style={{background:T.bg3,borderTop:`2px solid ${T.border2}`}}>
                  <td style={{padding:"14px 20px",fontFamily:"var(--font-d)",fontWeight:800,fontSize:13,color:T.text}}>TOTAL</td>
                  <td style={{padding:"14px 20px",textAlign:"right",fontFamily:"var(--font-d)",fontWeight:800,color:T.accent,fontSize:13}}>{fmtR(totalInv||null)}</td>
                  <td style={{padding:"14px 20px",textAlign:"right",fontFamily:"var(--font-d)",fontWeight:800,color:T.green,fontSize:13}}>{fmtR(totalVend||null)}</td>
                  <td 
                    style={{padding:"14px 20px",textAlign:"right",fontFamily:"var(--font-d)",fontWeight:800,fontSize:14,color:parseFloat(totalRoas)>=5?T.green:parseFloat(totalRoas)>=2?T.yellow:T.red}}>{totalRoas}</td>
                 </tr>
                </tfoot>
               </table>
              </div>
             </div>
            )}
           </>
          )}
         </div>
        );
       }

       return(
        <div>
         <div style={{marginBottom:20,display:"flex",alignItems:"center",justifyContent:"space-between"}}>
          <div style={{fontSize:12,color:T.muted}}>Clique em um cliente para ver e registrar resultados mensais, histórico e LTV.</div>
          <div className="filter-bar" style={{marginBottom:0}}>
           <span className="filter-label">Gestor:</span>
           {["TODOS",...managers].map(m=>(
            <button key={m} className={`filter-btn ${selMgr===m?"active":""}`}
             style={{opacity:loggedUser?.manager&&m!==loggedUser.manager&&m!=="TODOS"?.3:1,cursor:loggedUser?.manager?"default":"pointer"}}
             onClick={()=>{if(!loggedUser?.manager)setSelMgr(m);}}>
             {m}
            </button>
           ))}
          </div>
         </div>
         {}
         {(()=>{const visibleManagers=loggedUser?.manager?[loggedUser.manager]:managers;
          return(
           <div>
            {visibleManagers.map(mgr=>{const mgrClients=clients.filter(c=>c.manager===mgr);
             const isOpen=expandedManagers[mgr]!==false; // default open
             const userObj=usersState.find(u=>u.manager===mgr);
             const photoUrl=userObj?.photoUrl||"";
             return(
              <div key={mgr} style={{marginBottom:16}}>
               {}
               <button onClick={()=>setExpandedManagers(p=>({...p,[mgr]:!isOpen}))}
                
                  style={{width:"100%",background:T.bg1,border:`1px solid ${T.border}`,borderRadius:isOpen?"12px 12px 0 0":12,padding:"14px 18px",cursor:"pointer",display:"flex",alignItems:"center",gap:12,textAlign:"left",transition:"all .15s"}}
                onMouseEnter={e=>e.currentTarget.style.borderColor=T.border2}
                onMouseLeave={e=>e.currentTarget.style.borderColor=isOpen?T.border2:T.border}>
                {}
                <div 
                  style={{width:36,height:36,borderRadius:"50%",overflow:"hidden",flexShrink:0,background:`linear-gradient(135deg,${T.accent},#6366f1)`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:14,fontWeight:700,color:"#fff"}}>
                 {photoUrl?<img src={photoUrl} style={{width:"100%",height:"100%",objectFit:"cover"}} onError={e=>e.target.style.display="none"} alt={mgr}/>:mgr[0]}
                </div>
                <div style={{flex:1}}>
                 <div style={{fontFamily:"var(--font-d)",fontSize:15,fontWeight:800,color:T.text}}>{mgr}</div>
                 <div style={{fontSize:11,color:T.muted,marginTop:1}}>{mgrClients.length} cliente{mgrClients.length!==1?"s":""} · {userObj?.role||"Gestor de Tráfego"}</div>
                </div>
                <div style={{display:"flex",gap:8,alignItems:"center"}}>
                 <span style={{fontSize:11,color:T.muted,background:T.bg2,border:`1px solid ${T.border}`,padding:"3px 10px",borderRadius:20}}>
                  {Object.keys(Object.fromEntries(mgrClients.flatMap(c=>Object.keys(clientResults[c.id]?.months||{})).map(k=>[k,1]))).length} meses lançados
                 </span>
                 <span style={{fontSize:16,color:T.muted,fontWeight:700,transform:isOpen?"rotate(180deg)":"rotate(0deg)",transition:"transform .2s"}}>▼</span>
                </div>
               </button>

               {}
               {isOpen&&(
                <div 
                  style={{background:T.bg2,border:`1px solid ${T.border2}`,borderTop:"none",borderRadius:"0 0 12px 12px",padding:16,display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))",gap:10}}>
                 {mgrClients.map((client)=>{const cr=clientResults[client.id]||{months:{},entryDate:""};
                  const entryD=client.info?.entryDate||resultEntryDate[client.id]||cr.entryDate;
                  const age=getClientAge(entryD);
                  const ltv=calcLTV(client.id);
                  const plan=INNOVA_PLANS.find(p=>p.id===client.plan);
                  const lastKey=Object.keys(cr.months).sort().reverse()[0];
                  const lastMonth=lastKey?cr.months[lastKey]:null;
                  const lastRoas=lastMonth?calcROAS(lastMonth):"—";
                  const allMeetings=Object.values(cr.months).flatMap(m=>m.reunioes||[]).sort((a,b)=>new Date(b.date)-new Date(a.date));
                  const lastMeeting=allMeetings[0]||null;
                  const lastMeetingStr=lastMeeting
                   ?`${new Date(lastMeeting.date).toLocaleDateString("pt-BR")} (${lastMeeting.duration_min||"?"}min)`
                   :"—";
                  return(
                   <div key={client.id} onClick={()=>setSelectedResultClient(client.id)}
                    style={{background:T.bg1,border:`1px solid ${T.border}`,borderRadius:10,padding:14,cursor:"pointer",transition:"all .2s"}}
                    onMouseEnter={e=>{e.currentTarget.style.borderColor=T.border2;e.currentTarget.style.transform="translateY(-2px)";}}
                    onMouseLeave={e=>{e.currentTarget.style.borderColor=T.border;e.currentTarget.style.transform="translateY(0)";}}>
                    <div style={{display:"flex",alignItems:"flex-start",justifyContent:"space-between",marginBottom:8}}>
                     <div>
                      <div style={{fontFamily:"var(--font-d)",fontSize:13,fontWeight:700,color:T.text,marginBottom:2}}>{client.name}</div>
                      {age&&<div style={{fontSize:10,color:T.muted}}>🕐 {age} conosco</div>}
                     </div>
                     {plan&&<span style={{fontSize:9,fontWeight:700,padding:"2px 7px",borderRadius:20,background:`${plan.color}18`,color:plan.color,flexShrink:0}}>{plan.dot}</span>}
                    </div>
                    <div style={{display:"flex",gap:4,marginBottom:8,flexWrap:"wrap"}}>
                     {client.platforms.map(({p})=><span key={p} className={`platform-badge ${p}`} style={{fontSize:8}}>{P_LABEL[p]}</span>)}
                    </div>
                    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:5}}>
                     <div style={{background:T.bg2,borderRadius:6,padding:"5px 7px",textAlign:"center"}}>
                      <div style={{fontSize:7,color:T.muted,fontWeight:700,textTransform:"uppercase",letterSpacing:.3,marginBottom:2}}>LTV</div>
                      <div style={{fontFamily:"var(--font-d)",fontSize:12,fontWeight:800,color:T.green}}>{ltv?`R$${(ltv / 1000).toFixed(0)}k`:"—"}</div>
                     </div>
                     <div style={{background:T.bg2,borderRadius:6,padding:"5px 7px",textAlign:"center"}}>
                      <div style={{fontSize:7,color:T.muted,fontWeight:700,textTransform:"uppercase",letterSpacing:.3,marginBottom:2}}>ROAS</div>
                      <div style={{fontFamily:"var(--font-d)",fontSize:12,fontWeight:800,color:parseFloat(lastRoas)>=5?T.green:parseFloat(lastRoas)>=2?T.yellow:T.muted}}>{lastRoas}</div>
                     </div>
                     <div style={{background:T.bg2,borderRadius:6,padding:"5px 7px",textAlign:"center"}}>
                      <div style={{fontSize:7,color:T.muted,fontWeight:700,textTransform:"uppercase",letterSpacing:.3,marginBottom:2}}>Meses</div>
                      <div style={{fontFamily:"var(--font-d)",fontSize:12,fontWeight:800,color:T.accent}}>{Object.keys(cr.months).length||"—"}</div>
                     </div>
                    </div>
                    <div style={{marginTop:7,padding:"5px 8px",background:T.bg2,borderRadius:6,fontSize:9,color:T.muted,display:"flex",alignItems:"center",gap:4,overflow:"hidden"}}>
                     <span>🎥</span>
                     <span style={{overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{lastMeetingStr}</span>
                    </div>
                   </div>
                  );
                 })}
                </div>
               )}
              </div>
             );
            })}
           </div>
          );
         })()}

      {}
      {view==="clients"&&isAdmin&&(()=>{const editClient=selectedClientEdit?clients.find(c=>c.id===selectedClientEdit):null;

       if(editClient){const info=editClient.info||DEFAULT_CLIENT_INFO;
        return(
         <div style={{animation:"fadeUp .3s ease"}}>
          <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:24}}>
           <button className="btn-sm" onClick={()=>setSelectedClientEdit(null)}>← Voltar</button>
           <div style={{fontFamily:"var(--font-d)",fontSize:18,fontWeight:800,color:T.text}}>{editClient.name}</div>
          </div>

          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16,marginBottom:16}}>
           {}
           <div style={{background:T.bg1,border:`1px solid ${T.border}`,borderRadius:12,overflow:"hidden"}}>
            <div style={{padding:"12px 16px",background:T.bg2,borderBottom:`1px solid ${T.border}`,fontFamily:"var(--font-d)",fontWeight:700,fontSize:13}}>📋 Dados do Cliente</div>
            <div style={{padding:16,display:"flex",flexDirection:"column",gap:12}}>
             <div><label className="field-label">Nome</label>
              <input className="field-input" style={{marginBottom:0}} value={editClient.name}
               onChange={e=>setClients(prev=>prev.map(c=>c.id===editClient.id?{...c,name:e.target.value}:c))}/></div>
             <div><label className="field-label">Gestor</label>
              <select className="field-input" style={{marginBottom:0}} value={editClient.manager}
               onChange={e=>setClients(prev=>prev.map(c=>c.id===editClient.id?{...c,manager:e.target.value}:c))}>
               {managers.map(m=><option key={m}>{m}</option>)}
              </select></div>
             <div><label className="field-label">Plano</label>
              <select className="field-input" style={{marginBottom:0}} value={editClient.plan||""}
               onChange={e=>setClients(prev=>prev.map(c=>c.id===editClient.id?{...c,plan:e.target.value}:c))}>
               <option value="">Sem plano</option>
               {INNOVA_PLANS.map(p=><option key={p.id} value={p.id}>{p.dot} {p.name}</option>)}
              </select></div>
             <div><label className="field-label">Data de Entrada</label>
              <input type="date" className="field-input" style={{marginBottom:0}} value={info.entryDate||""}
               onChange={e=>setClients(prev=>prev.map(c=>c.id===editClient.id?{...c,info:{...c.info,entryDate:e.target.value}}:c))}/></div>
             <div><label className="field-label">Cidade (para o Mapa)</label>
              <select className="field-input" style={{marginBottom:0}} value={info.city||""}
               onChange={e=>{setClients(prev=>prev.map(c=>c.id===editClient.id?{...c,info:{...c.info,city:e.target.value}}:c));
                setMapClients(prev=>prev.map(mc=>mc.id===editClient.id?{...mc,city:e.target.value}:mc));
               }}>
               {Object.keys(BR_CITIES).map(city=><option key={city}>{city}</option>)}
              </select></div>
             <div><label className="field-label">Budget Total do Plano (R$)</label>
              <input type="number" className="field-input" style={{marginBottom:0}} placeholder="Ex: 5000" value={info.budget_total||""}
               onChange={e=>setClients(prev=>prev.map(c=>c.id===editClient.id?{...c,info:{...c.info,budget_total:parseFloat(e.target.value)||0}}:c))}/></div>
             <div><label className="field-label">Observações</label>
              <textarea className="field-input" style={{marginBottom:0,minHeight:60}} value={info.observacoes||""}
               onChange={e=>setClients(prev=>prev.map(c=>c.id===editClient.id?{...c,info:{...c.info,observacoes:e.target.value}}:c))}/></div>
            </div>
           </div>

           {}
           <div style={{display:"flex",flexDirection:"column",gap:12}}>
            <div style={{background:T.bg1,border:`1px solid ${T.border}`,borderRadius:12,overflow:"hidden"}}>
             <div 
               style={{padding:"12px 16px",background:"rgba(66,133,244,.15)",borderBottom:`1px solid ${T.border}`,fontFamily:"var(--font-d)",fontWeight:700,fontSize:13,color:"#4285f4"}}>🔵 Google Ads</div>
             <div style={{padding:16,display:"flex",flexDirection:"column",gap:12}}>
              <div><label className="field-label">ID da Conta Google Ads</label>
               <input className="field-input" style={{marginBottom:0}} placeholder="123-456-7890" value={info.googleAccountId||""}
                onChange={e=>setClients(prev=>prev.map(c=>c.id===editClient.id?{...c,info:{...c.info,googleAccountId:e.target.value}}:c))}/></div>
              <div><label className="field-label">Budget Mensal Google Ads (R$)</label>
               <input type="number" className="field-input" style={{marginBottom:0}} placeholder="0" value={info.budget_google||""}
                onChange={e=>setClients(prev=>prev.map(c=>c.id===editClient.id?{...c,info:{...c.info,budget_google:parseFloat(e.target.value)||0}}:c))}/></div>
              <div><label className="field-label">Meta CPL Google</label>
               <input type="number" className="field-input" style={{marginBottom:0}} placeholder="35" value={editClient.platforms.find(p=>p.p==="google")?.meta_cpl||""}
                onChange={e=>setClients(prev=>prev.map(c=>c.id===editClient.id?{...c,platforms:c.platforms.map(pl=>pl.p==="google"?{...pl,meta_cpl:parseFloat(e.target.value)||0}:pl)}:c))}/></div>
             </div>
            </div>
            <div style={{background:T.bg1,border:`1px solid ${T.border}`,borderRadius:12,overflow:"hidden"}}>
             <div 
               style={{padding:"12px 16px",background:"rgba(0,130,251,.15)",borderBottom:`1px solid ${T.border}`,fontFamily:"var(--font-d)",fontWeight:700,fontSize:13,color:"#0082fb"}}>🔵 Meta Ads</div>
             <div style={{padding:16,display:"flex",flexDirection:"column",gap:12}}>
              <div><label className="field-label">ID da Conta Meta Ads</label>
               <input className="field-input" style={{marginBottom:0}} placeholder="act_XXXXXXXXXXXXX" value={info.metaAccountId||""}
                onChange={e=>setClients(prev=>prev.map(c=>c.id===editClient.id?{...c,info:{...c.info,metaAccountId:e.target.value}}:c))}/></div>
              <div><label className="field-label">Budget Mensal Meta Ads (R$)</label>
               <input type="number" className="field-input" style={{marginBottom:0}} placeholder="0" value={info.budget_meta||""}
                onChange={e=>setClients(prev=>prev.map(c=>c.id===editClient.id?{...c,info:{...c.info,budget_meta:parseFloat(e.target.value)||0}}:c))}/></div>
              <div><label className="field-label">Meta CPL Meta Ads</label>
               <input type="number" className="field-input" style={{marginBottom:0}} placeholder="9" value={editClient.platforms.find(p=>p.p==="meta")?.meta_cpl||""}
                onChange={e=>setClients(prev=>prev.map(c=>c.id===editClient.id?{...c,platforms:c.platforms.map(pl=>pl.p==="meta"?{...pl,meta_cpl:parseFloat(e.target.value)||0}:pl)}:c))}/></div>
             </div>
            </div>
           </div>
          </div>

          <button className="btn-accent" onClick={()=>{showToast("✅","Cliente salvo");setSelectedClientEdit(null);}}>✅ Salvar Cliente</button>
         </div>
        );
       }

       return(
        <div>
         {}
         <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(260px,1fr))",gap:14,marginBottom:28}}>
          {managers.map((mgr,i)=>{const mgrClients=clients.filter(c=>c.manager===mgr);
           const googleCount=mgrClients.filter(c=>c.platforms.some(p=>p.p==="google")).length;
           const metaCount=mgrClients.filter(c=>c.platforms.some(p=>p.p==="meta")).length;
           const totalClients=mgrClients.length;
           const budgetTotal=mgrClients.reduce((s,c)=>{const info=c.info||DEFAULT_CLIENT_INFO;
            return s+(info.budget_google||0)+(info.budget_meta||0);
           },0);
           const colors=["#3b82f6","#10b981","#f59e0b","#a855f7","#ef4444"];
           const col=colors[i%colors.length];
           return(
            <div key={mgr} style={{background:T.bg1,border:`1px solid ${T.border}`,borderLeft:`4px solid ${col}`,borderRadius:12,padding:20,animation:`fadeUp .3s ease ${i*.06}s both`}}>
             <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:16}}>
              <div style={{fontFamily:"var(--font-d)",fontSize:16,fontWeight:800,color:T.text}}>{mgr}</div>
              <div 
                style={{width:36,height:36,borderRadius:"50%",background:`${col}20`,display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"var(--font-d)",fontSize:16,fontWeight:800,color:col}}>{mgr[0]}</div>
             </div>
             <div style={{display:"flex",flexDirection:"column",gap:8}}>
              <div 
                style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"8px 12px",background:"rgba(66,133,244,.08)",borderRadius:8,border:"1px solid rgba(66,133,244,.15)"}}>
               <div style={{display:"flex",alignItems:"center",gap:8}}>
                <span className="platform-badge google" style={{fontSize:9}}>Google Ads</span>
               </div>
               <div 
                 style={{fontFamily:"var(--font-d)",fontSize:20,fontWeight:800,color:"#4285f4"}}>{googleCount}<span 
                 style={{fontSize:11,fontWeight:400,color:T.muted,marginLeft:4}}>contas</span></div>
              </div>
              <div 
                style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"8px 12px",background:"rgba(0,130,251,.08)",borderRadius:8,border:"1px solid rgba(0,130,251,.15)"}}>
               <div style={{display:"flex",alignItems:"center",gap:8}}>
                <span className="platform-badge meta" style={{fontSize:9}}>Meta Ads</span>
               </div>
               <div style={{fontFamily:"var(--font-d)",fontSize:20,fontWeight:800,color:"#0082fb"}}>{metaCount}<span style={{fontSize:11,fontWeight:400,color:T.muted,marginLeft:4}}>contas</span></div>
              </div>
              <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"8px 12px",background:`${col}08`,borderRadius:8,border:`1px solid ${col}20`,marginTop:4}}>
               <span style={{fontSize:12,fontWeight:700,color:T.muted,textTransform:"uppercase",letterSpacing:.5}}>Total de Clientes</span>
               <div style={{fontFamily:"var(--font-d)",fontSize:24,fontWeight:800,color:col}}>{totalClients}</div>
              </div>
              {budgetTotal>0&&(
               <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"6px 12px",background:`${T.green}08`,borderRadius:8,border:`1px solid ${T.green}20`}}>
                <span style={{fontSize:11,color:T.muted}}>Budget total gerenciado</span>
                <span style={{fontFamily:"var(--font-d)",fontSize:13,fontWeight:700,color:T.green}}>R${budgetTotal.toLocaleString("pt-BR")}</span>
               </div>
              )}
             </div>
            </div>
           );
          })}
         </div>

         <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:16}}>
          <div style={{fontSize:12,color:T.muted}}>Gerencie os dados, contas e orçamentos de cada cliente. Somente administradores têm acesso.</div>
          <button className="btn-accent" onClick={()=>{
           const newId=Math.max(...clients.map(c=>c.id))+1;
           const newC={id:newId,name:"Novo Cliente",manager:managers[0]||"BRENDA",plan:"essencial",info:{...DEFAULT_CLIENT_INFO},platforms:[],scope:{...DEFAULT_SCOPE}};
           setClients(p=>[...p,newC]);
           setSelectedClientEdit(newId);
           showToast("✅","Novo cliente criado");
          }}>+ Novo Cliente</button>
         </div>
         <div style={{background:T.bg1,border:`1px solid ${T.border}`,borderRadius:14,overflow:"hidden"}}>
          {}
          <div style={{display:"grid",gridTemplateColumns:"1fr 110px 140px 120px 120px 120px 110px 90px",borderBottom:`2px solid ${T.border2}`}}>
           {["Cliente","Gestor","Plano","Budget Google","Budget Meta","Budget Total","Cidade",""].map((h,i)=>(
            <div 
              key={h+i} 
              style={{padding:"11px 14px",fontSize:10,fontWeight:700,color:T.muted,textTransform:"uppercase",letterSpacing:.5,borderRight:i<7?`1px solid ${T.border}`:"none",background:T.bg3}}>{h}</div>
           ))}
          </div>
          {clients.map((client,i)=>{const info=client.info||DEFAULT_CLIENT_INFO;
           const plan=INNOVA_PLANS.find(p=>p.id===client.plan);
           const budgetTotal=info.budget_total||0;
           const isLast=i===clients.length-1;
           return(
            <div 
              key={client.id} 
              style={{display:"grid",gridTemplateColumns:"1fr 110px 140px 120px 120px 120px 110px 90px",borderBottom:isLast?"none":`1px solid ${T.border}`,transition:"background .1s"}}
             onMouseEnter={e=>e.currentTarget.style.background=T.bg2}
             onMouseLeave={e=>e.currentTarget.style.background="transparent"}>
             <div style={{padding:"12px 14px",borderRight:`1px solid ${T.border}`}}>
              <div style={{fontFamily:"var(--font-d)",fontWeight:700,fontSize:13,color:T.text,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{client.name}</div>
              <div style={{marginTop:4,display:"flex",gap:4,flexWrap:"wrap"}}>
               {client.platforms.map(({p})=><span key={p} className={`platform-badge ${p}`} style={{fontSize:8}}>{P_LABEL[p]}</span>)}
              </div>
             </div>
             <div 
               style={{padding:"12px 10px",borderRight:`1px solid ${T.border}`,fontSize:11,color:T.muted,display:"flex",alignItems:"center",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{client.manager}</div>
             <div style={{padding:"12px 10px",borderRight:`1px solid ${T.border}`,display:"flex",alignItems:"center"}}>
              {plan?<span 
                style={{fontSize:9,fontWeight:600,padding:"2px 6px",borderRadius:10,background:`${plan.color}18`,color:plan.color,whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis",maxWidth:"100%"}}>{plan.dot} {plan.name.replace("INNOVA ","")}</span>:<span 
                style={{color:T.muted2,fontSize:11}}>—</span>}
             </div>
             <div 
               style={{padding:"12px 10px",borderRight:`1px solid ${T.border}`,fontSize:11,fontFamily:"var(--font-m)",color:info.budget_google?T.green:T.muted2,display:"flex",alignItems:"center"}}>{info.budget_google?`R$${Number(info.budget_google).toLocaleString("pt-BR")}`:"—"}</div>
             <div 
               style={{padding:"12px 10px",borderRight:`1px solid ${T.border}`,fontSize:11,fontFamily:"var(--font-m)",color:info.budget_meta?T.green:T.muted2,display:"flex",alignItems:"center"}}>{info.budget_meta?`R$${Number(info.budget_meta).toLocaleString("pt-BR")}`:"—"}</div>
             <div 
               style={{padding:"12px 10px",borderRight:`1px solid ${T.border}`,fontSize:11,fontFamily:"var(--font-m)",fontWeight:700,color:budgetTotal?T.accent:T.muted2,display:"flex",alignItems:"center"}}>{budgetTotal?`R$${Number(budgetTotal).toLocaleString("pt-BR")}`:"—"}</div>
             <div 
               style={{padding:"12px 10px",borderRight:`1px solid ${T.border}`,fontSize:10,color:T.muted,display:"flex",alignItems:"center",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{info.city?.split(",")[0]||"—"}</div>
             <div style={{padding:"10px 14px",display:"flex",alignItems:"center",justifyContent:"center"}}>
              <button className="edit-scope-btn" onClick={()=>setSelectedClientEdit(client.id)}>✏️ Editar</button>
             </div>
            </div>
           );
          })}
         </div>
        </div>
       );
      })()}

      {}
      {view==="agenda"&&(
       <div>
        {}
        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:20,flexWrap:"wrap",gap:12}}>
         <div>
          <div style={{fontSize:12,color:T.muted}}>
           {gcalId?"Sincronizado com Google Calendar":"Agenda interna — vincule o Google Calendar em Configurações → Conexões"}
          </div>
         </div>
         <div style={{display:"flex",gap:8,alignItems:"center"}}>
          {!gcalId&&(
           <button className="btn-sm" onClick={()=>{setView("settings");showToast("⚙️","Configure o Google Calendar em Conexões")}}>
            🔗 Vincular Google Calendar
           </button>
          )}
          <button className="btn-accent" onClick={()=>{
           const today=new Date().toISOString().split("T")[0];
           setAgendaForm({title:"",client:"",date:today,time:"10:00",duration:"60",link:"",notes:""});
           setAgendaModal(true);
          }}>+ Nova Reunião</button>
         </div>
        </div>

        {}
        {agendaModal&&(
         <div className="modal-overlay" onClick={()=>setAgendaModal(false)}>
          <div className="modal" onClick={e=>e.stopPropagation()} style={{width:480}}>
           <div className="modal-title">Nova Reunião</div>
           <div className="modal-sub">Registre manualmente ou use o Google Calendar para sincronizar automaticamente</div>
           <label className="field-label">Título / Pauta</label>
           <input className="field-input" placeholder="Ex: Reunião mensal - ACG Persianas" value={agendaForm.title}
            onChange={e=>setAgendaForm(p=>({...p,title:e.target.value}))}/>
           <label className="field-label">Cliente</label>
           <select className="field-input" value={agendaForm.client} onChange={e=>setAgendaForm(p=>({...p,client:e.target.value}))}>
            <option value="">Sem cliente específico</option>
            {managers.map(mgr=>(
             <optgroup key={mgr} label={mgr}>
              {clients.filter(c=>c.manager===mgr).map(c=>(
               <option key={c.id} value={c.name}>{c.name}</option>
              ))}
             </optgroup>
            ))}
           </select>
           <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:10}}>
            <div><label className="field-label">Data</label>
             <input type="date" className="field-input" style={{marginBottom:0}} value={agendaForm.date}
              onChange={e=>setAgendaForm(p=>({...p,date:e.target.value}))}/></div>
            <div><label className="field-label">Hora</label>
             <input type="time" className="field-input" style={{marginBottom:0}} value={agendaForm.time}
              onChange={e=>setAgendaForm(p=>({...p,time:e.target.value}))}/></div>
            <div><label className="field-label">Duração (min)</label>
             <input type="number" className="field-input" style={{marginBottom:0}} value={agendaForm.duration} placeholder="60"
              onChange={e=>setAgendaForm(p=>({...p,duration:e.target.value}))}/></div>
           </div>
           <label className="field-label" style={{marginTop:12}}>Link da reunião (Meet / Zoom)</label>
           <input className="field-input" placeholder="https://meet.google.com/..." value={agendaForm.link}
            onChange={e=>setAgendaForm(p=>({...p,link:e.target.value}))}/>
           <label className="field-label">Observações</label>
           <textarea className="field-input" placeholder="Pauta, pontos a discutir..." value={agendaForm.notes}
            onChange={e=>setAgendaForm(p=>({...p,notes:e.target.value}))} style={{minHeight:60}}/>
           <div style={{display:"flex",gap:10,marginTop:4}}>
            <button className="btn-accent" style={{flex:1}} onClick={()=>{
             if(!agendaForm.title||!agendaForm.date) return;
             const newEv={id:Date.now(),...agendaForm};
             setAgendaEvents(p=>[...p,newEv].sort((a,b)=>a.date+a.time>b.date+b.time?1:-1));
             setAgendaModal(false);
             showToast("📆","Reunião adicionada à agenda");
            }}>Salvar Reunião</button>
            <button className="btn-sm" style={{flex:1}} onClick={()=>setAgendaModal(false)}>Cancelar</button>
           </div>
          </div>
         </div>
        )}

        {}
        {gcalId&&(
         <div style={{background:T.bg1,border:`1px solid ${T.border}`,borderRadius:14,overflow:"hidden",marginBottom:20}}>
          <div style={{padding:"12px 16px",background:T.bg2,borderBottom:`1px solid ${T.border}`,display:"flex",alignItems:"center",gap:10}}>
           <span style={{fontSize:16}}>📆</span>
           <span style={{fontFamily:"var(--font-d)",fontSize:13,fontWeight:700,color:T.text}}>Google Calendar</span>
           <a href={`https://calendar.google.com / calendar / r`} target="_blank" rel="noopener noreferrer"
            style={{marginLeft:"auto",fontSize:11,color:T.accent,textDecoration:"none",fontWeight:600}}>
            Abrir no Google Calendar →
           </a>
          </div>
          <iframe
           src={`https://calendar.google.com / calendar / embed?src=${encodeURIComponent(gcalId)}&ctz=America%2FSao_Paulo&showTitle=0&showNav=1&showDate=1&showPrint=0&showTabs=1&showCalendars=0&mode=WEEK&hl=pt_BR`}
           width="100%" height="600"
           style={{display:"block",border:"none"}}
           frameBorder="0" scrolling="no"
           title="Google Calendar"/>
         </div>
        )}

        {}
        <div style={{background:T.bg1,border:`1px solid ${T.border}`,borderRadius:14,overflow:"hidden"}}>
         <div style={{padding:"12px 16px",background:T.bg2,borderBottom:`1px solid ${T.border}`,display:"flex",alignItems:"center",justifyContent:"space-between"}}>
          <div style={{fontFamily:"var(--font-d)",fontSize:13,fontWeight:700,color:T.text}}>
           📋 Reuniões Registradas {agendaEvents.length>0&&`(${agendaEvents.length})`}
          </div>
          <span style={{fontSize:11,color:T.muted}}>
           {gcalId?"Complementa o Google Calendar":"Registre manualmente até vincular o Google Calendar"}
          </span>
         </div>

         {agendaEvents.length===0?(
          <div style={{padding:"48px 0",textAlign:"center",color:T.muted2}}>
           <div style={{fontSize:40,marginBottom:12,opacity:.3}}>🗓️</div>
           <div style={{fontFamily:"var(--font-d)",fontSize:14,fontWeight:700,color:T.muted,marginBottom:6}}>Nenhuma reunião registrada</div>
           <div style={{fontSize:12}}>Clique em "+ Nova Reunião" para adicionar</div>
          </div>
         ):(
          <div>
           {(()=>{const today=new Date().toISOString().split("T")[0];
            const upcoming=agendaEvents.filter(e=>e.date>=today);
            const past=agendaEvents.filter(e=>e.date!==today&&e.date.localeCompare(today)<0);
            const EventRow=({ev})=>{const client=clients.find(c=>c.name===ev.client);
             const plan=client?INNOVA_PLANS.find(p=>p.id===client.plan):null;
             const isPast=ev.date.localeCompare(today)<0;
             const dateObj=new Date(ev.date+"T"+ev.time);
             return(
              <div style={{display:"flex",alignItems:"stretch",gap:0,borderBottom:`1px solid ${T.border}80`,transition:"background .1s"}}
               onMouseEnter={e=>e.currentTarget.style.background=T.bg2}
               onMouseLeave={e=>e.currentTarget.style.background="transparent"}>
               {}
               <div 
                 style={{width:80,flexShrink:0,padding:"14px 12px",borderRight:`1px solid ${T.border}`,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",background:isPast?T.bg3:`${T.accent}08`}}>
                <div style={{fontSize:20,fontWeight:800,color:isPast?T.muted:T.accent,lineHeight:1,fontFamily:"var(--font-d)"}}>
                 {ev.date.split("-")[2]}
                </div>
                <div style={{fontSize:10,color:T.muted,fontWeight:600,textTransform:"uppercase"}}>
                 {dateObj.toLocaleDateString("pt-BR",{month:"short"}).replace(".","").toUpperCase()}
                </div>
                <div style={{fontSize:10,color:T.muted,marginTop:2}}>{ev.time}</div>
               </div>
               {}
               <div style={{flex:1,padding:"14px 16px"}}>
                <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:4,flexWrap:"wrap"}}>
                 <div style={{fontFamily:"var(--font-d)",fontSize:13,fontWeight:700,color:isPast?T.muted:T.text}}>{ev.title}</div>
                 {ev.client&&<span style={{fontSize:10,color:T.muted,background:T.bg2,border:`1px solid ${T.border}`,padding:"2px 8px",borderRadius:10}}>{ev.client}</span>}
                 {plan&&<span style={{fontSize:9,padding:"2px 7px",borderRadius:10,background:`${plan.color}18`,color:plan.color,fontWeight:700}}>{plan.dot}</span>}
                 {isPast&&<span style={{fontSize:9,fontWeight:700,padding:"2px 7px",borderRadius:10,background:`${T.muted}18`,color:T.muted}}>Realizada</span>}
                </div>
                <div style={{display:"flex",gap:16,fontSize:11,color:T.muted,flexWrap:"wrap"}}>
                 {ev.duration&&<span>⏱ {ev.duration} min ({(ev.duration / 60).toFixed(1)}h)</span>}
                 {ev.notes&&<span style={{overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",maxWidth:300}}>📝 {ev.notes}</span>}
                </div>
               </div>
               {}
               <div style={{padding:"14px 12px",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:8,borderLeft:`1px solid ${T.border}`,flexShrink:0}}>
                {ev.link&&(
                 <a href={ev.link} target="_blank" rel="noopener noreferrer"
                  
                    style={{fontSize:10,fontWeight:600,padding:"4px 10px",borderRadius:6,background:`${T.accent}15`,color:T.accent,border:`1px solid ${T.accent}30`,textDecoration:"none",whiteSpace:"nowrap"}}>
                  🎥 Entrar
                 </a>
                )}
                <button className="edit-scope-btn" style={{color:T.red,borderColor:`${T.red}40`,fontSize:10}}
                 onClick={()=>{setAgendaEvents(p=>p.filter(x=>x.id!==ev.id));showToast("🗑️","Reunião removida");}}>
                 ✕
                </button>
               </div>
              </div>
             );
            };
            return(
             <>
              {upcoming.length>0&&(
               <div>
                <div style={{padding:"8px 16px",background:T.bg3,fontSize:10,fontWeight:700,color:T.accent,textTransform:"uppercase",letterSpacing:.5}}>
                 Próximas — {upcoming.length}
                </div>
                {upcoming.map(ev=><EventRow key={ev.id} ev={ev}/>)}
               </div>
              )}
              {past.length>0&&(
               <div>
                <div style={{padding:"8px 16px",background:T.bg3,fontSize:10,fontWeight:700,color:T.muted,textTransform:"uppercase",letterSpacing:.5}}>
                 Realizadas — {past.length}
                </div>
                {past.map(ev=><EventRow key={ev.id} ev={ev}/>)}
               </div>
              )}
             </>
            );
           })()}
          </div>
         )}
        </div>
       </div>
      )}

      {}
      {view==="map"&&(
       <div>
        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:20}}>
         <div>
          <div style={{fontFamily:"var(--font-d)",fontSize:15,fontWeight:700,marginBottom:4}}>Mapa de Clientes — Brasil</div>
          <div style={{fontSize:12,color:T.muted}}>Visualização de todos os clientes no mapa · visível para toda a equipe</div>
         </div>
         {isAdmin&&(
          <a href="https://www.google.com/maps/d/u/0/edit?mid=1vqJkwX76oTpdw83Fh-ViY7u_LEnHf-8" target="_blank" rel="noopener noreferrer" className="btn-accent" 
            style={{textDecoration:"none",display:"inline-flex",alignItems:"center",gap:6}}>
           ✏️ Editar no Google Maps
          </a>
         )}
        </div>

        <div className="map-container" style={{borderRadius:14,overflow:"hidden",border:`1px solid ${T.border}`}}>
         <iframe
          src="https://www.google.com/maps/d/u/0/embed?mid=1vqJkwX76oTpdw83Fh-ViY7u_LEnHf-8&ehbc=2E312F"
          width="100%"
          height="600"
          style={{display:"block",border:"none"}}
          allowFullScreen
          loading="lazy"
          title="Mapa de Clientes"
         />
         <div style={{padding:"12px 20px",borderTop:`1px solid ${T.border}`,display:"flex",gap:16,alignItems:"center",background:T.bg2,fontSize:11,color:T.muted}}>
          <span>📍 Mapa mantido via Google My Maps</span>
          {isAdmin&&<span>· Clique em "Editar no Google Maps" para adicionar ou mover pins</span>}
          <span style={{marginLeft:"auto"}}>{clients.length} clientes cadastrados</span>
         </div>
        </div>
       </div>
      )}

      {}
      {view==="settings"&&isAdmin&&(
       <div>
        {}
        <div style={{display:"flex",gap:0,marginBottom:24,borderBottom:`1px solid ${T.border}`}}>
         {[{k:"aparencia",l:"Aparência"},{k:"marca",l:"Marca & Logo"},{k:"conexoes",l:"Conexões"},{k:"usuarios",l:"Usuários"}].map(({k,l})=>(
          <button 
            key={k} 
            onClick={()=>setSettingsTab(k)} 
            style={{background:"none",border:"none",borderBottom:`2px solid ${settingsTab===k?T.accent:"transparent"}`,color:settingsTab===k?T.accent:T.muted,padding:"10px 20px",cursor:"pointer",fontFamily:"var(--font-d)",fontSize:13,fontWeight:600,transition:"all .15s",marginBottom:-1}}>
           {l}
          </button>
         ))}
        </div>

        {}
        {settingsTab==="aparencia"&&(
         <div>
          <div className="settings-section">
           <div className="settings-section-header">🎨 Tema de Cores</div>
           <div className="settings-body">
            <div style={{display:"flex",gap:12,flexWrap:"wrap"}}>
             {Object.entries({night:{label:"🌙 Noite",preview:"#120e00",accent:"#f97316"},blue:{label:"🔵 Azul",preview:"#03071e",accent:"#4c8ef7"},light:{label:"☀️ Claro",preview:"#fff8f0",accent:"#f97316"}}).map(([k,{label,preview,accent}])=>(
              <button key={k} className={`theme-btn ${theme===k?"active":""}`} onClick={()=>setTheme(k)}
               style={{background:theme===k?`${T.accent}12`:T.bg2,color:theme===k?T.accent:T.muted,borderColor:theme===k?T.accent:T.border}}>
               <div style={{width:48,height:28,borderRadius:6,background:preview,border:`1px solid ${T.border}`,overflow:"hidden",position:"relative"}}>
                <div style={{position:"absolute",bottom:0,left:0,right:0,height:8,background:accent}}/>
               </div>
               <span style={{fontSize:12}}>{label}</span>
              </button>
             ))}
            </div>
            <div style={{marginTop:12,fontSize:11,color:T.muted}}>O tema é pessoal — cada usuário pode escolher o seu.</div>
           </div>
          </div>
         </div>
        )}

        {}
        {settingsTab==="marca"&&(
         <div>
          <div className="settings-section">
           <div className="settings-section-header">🏷️ Identidade Visual</div>
           <div className="settings-body">

            {}
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16,marginBottom:4}}>
             <div>
              <label className="field-label">Logo — Fundo Escuro (night / blue)</label>
              <input className="field-input" value={logoUrlDark} placeholder="https://sua-logo-branca.com / logo.png"
               onChange={e=>setLogoUrlDark(e.target.value)}/>
              {logoUrlDark&&(
               <div 
                 style={{background:"#0d1220",border:`1px solid ${T.border}`,borderRadius:8,padding:12,display:"flex",alignItems:"center",justifyContent:"center",minHeight:64,marginTop:-12,marginBottom:16}}>
                <img src={logoUrlDark} style={{maxHeight:44,maxWidth:"100%",objectFit:"contain"}} onError={e=>e.target.style.display="none"} alt="logo dark"/>
               </div>
              )}
             </div>
             <div>
              <label className="field-label">Logo — Fundo Claro (light)</label>
              <input className="field-input" value={logoUrl} placeholder="https://sua-logo-escura.com / logo.png"
               onChange={e=>setLogoUrl(e.target.value)}/>
              {logoUrl&&(
               <div 
                 style={{background:"#ffffff",border:`1px solid ${T.border2}`,borderRadius:8,padding:12,display:"flex",alignItems:"center",justifyContent:"center",minHeight:64,marginTop:-12,marginBottom:16}}>
                <img src={logoUrl} style={{maxHeight:44,maxWidth:"100%",objectFit:"contain"}} onError={e=>e.target.style.display="none"} alt="logo light"/>
               </div>
              )}
             </div>
            </div>

            <label className="field-label">Nome da Plataforma</label>
            <input className="field-input" value={brandName} onChange={e=>setBrandName(e.target.value)}/>
            <label className="field-label">Subtítulo</label>
            <input className="field-input" value={brandSub} onChange={e=>setBrandSub(e.target.value)}/>

            <div style={{padding:16,background:T.bg2,borderRadius:10,border:`1px solid ${T.border}`}}>
             <div style={{fontSize:11,color:T.muted,marginBottom:12}}>Prévia no tema atual ({theme}):</div>
             <LogoBlock size="lg"/>
            </div>
           </div>
          </div>
         </div>
        )}

        {}
        {settingsTab==="conexoes"&&(
         <div>
          {}
          <div className="settings-section" style={{marginBottom:20}}>
           <div className="settings-section-header">🔌 Status das APIs</div>
           <div className="settings-body">
            {[{name:"Google Ads API",desc:"Puxa leads e gasto automaticamente",connected:false,color:"#4285f4"},
             {name:"Meta Ads API",desc:"Puxa leads e gasto automaticamente",connected:false,color:"#0082fb"},
             {name:"Google Analytics",desc:"Métricas de conversão e tráfego",connected:false,color:"#e37400"},].map(conn=>(
             <div key={conn.name} className="conn-card">
              <div style={{display:"flex",alignItems:"center",gap:12}}>
               <div style={{width:36,height:36,borderRadius:8,background:`${conn.color}20`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:16}}>
                {conn.name.includes("Google Ads")?"📊":conn.name.includes("Meta")?"📱":"📈"}
               </div>
               <div>
                <div style={{fontFamily:"var(--font-d)",fontSize:13,fontWeight:700,color:T.text}}>{conn.name}</div>
                <div style={{fontSize:11,color:T.muted}}>{conn.desc}</div>
               </div>
              </div>
              <div style={{display:"flex",alignItems:"center",gap:12}}>
               <div className="conn-status">
                <div className="conn-dot" style={{background:conn.connected?T.green:T.muted}}/>
                <span style={{color:conn.connected?T.green:T.muted,fontSize:11}}>{conn.connected?"Conectado":"Desconectado"}</span>
               </div>
               <button className="btn-sm" onClick={()=>showToast("🔌",`Configure as credenciais do ${conn.name} para conectar`)}>
                {conn.connected?"Reconectar":"Conectar"}
               </button>
              </div>
             </div>
            ))}

            {}
            <div style={{marginTop:12,background:T.bg2,border:`1px solid ${T.border}`,borderRadius:10,overflow:"hidden"}}>
             <div style={{padding:"12px 16px",background:"#0F9D5820",borderBottom:`1px solid ${T.border}`,display:"flex",alignItems:"center",gap:10}}>
              <span style={{fontSize:20}}>📆</span>
              <div>
               <div style={{fontFamily:"var(--font-d)",fontSize:13,fontWeight:700,color:T.text}}>Google Calendar</div>
               <div style={{fontSize:11,color:T.muted}}>Sincronize a agenda de reuniões com Google Agenda</div>
              </div>
              <div style={{marginLeft:"auto",display:"flex",alignItems:"center",gap:6}}>
               <div className="conn-dot" style={{width:8,height:8,borderRadius:"50%",background:gcalId?T.green:T.muted}}/>
               <span style={{fontSize:11,color:gcalId?T.green:T.muted,fontWeight:600}}>{gcalId?"Configurado":"Não configurado"}</span>
              </div>
             </div>
             <div style={{padding:16,display:"flex",flexDirection:"column",gap:12}}>
              <div>
               <label className="field-label">ID da Agenda (Calendar ID)</label>
               <input className="field-input" style={{marginBottom:0}} value={gcalId}
                placeholder="ex: sua_conta@group.calendar.google.com"
                onChange={e=>setGcalId(e.target.value)}/>
               <div style={{fontSize:10,color:T.muted,marginTop:6}}>
                Encontre em Google Calendar → Configurações da agenda → ID da agenda
               </div>
              </div>
              {gcalId&&(
               <div style={{padding:10,background:`${T.green}10`,border:`1px solid ${T.green}25`,borderRadius:8,fontSize:11,color:T.muted}}>
                ✅ Agenda vinculada. O iframe do Google Calendar será exibido na aba Agenda.
               </div>
              )}
              <div style={{display:"flex",gap:8}}>
               <a href="https://calendar.google.com" target="_blank" rel="noopener noreferrer"
                style={{fontSize:11,fontWeight:600,padding:"6px 14px",borderRadius:7,border:`1px solid ${T.border2}`,color:T.muted,textDecoration:"none",fontFamily:"var(--font-d)"}}>
                Abrir Google Calendar →
               </a>
               {gcalId&&<button className="btn-sm" onClick={()=>{setGcalId("");showToast("🗑️","Agenda desvinculada");}}>Desvincular</button>}
              </div>
             </div>
            </div>
           </div>
          </div>

          {}
          <div className="settings-section">
           <div className="settings-section-header">👤 Contas por Gestor</div>
           <div className="settings-body">
            <div style={{fontSize:11,color:T.muted,marginBottom:16,lineHeight:1.6}}>
             Vincule as contas do Google Ads e Meta Ads de cada gestor. O gestor só verá as contas listadas aqui no seu acesso.
            </div>
            {managers.map(mgr=>{const mgrClients=clients.filter(c=>c.manager===mgr);
             const googleAccounts=mgrClients.map(c=>({id:c.id,name:c.name,accountId:c.info?.googleAccountId||""})).filter(c=>c.accountId||c.id);
             const metaAccounts=mgrClients.map(c=>({id:c.id,name:c.name,accountId:c.info?.metaAccountId||""})).filter(c=>c.accountId||c.id);
             return(
              <div key={mgr} style={{background:T.bg2,border:`1px solid ${T.border}`,borderRadius:10,overflow:"hidden",marginBottom:14}}>
               {}
               <div style={{padding:"10px 16px",background:T.bg3,borderBottom:`1px solid ${T.border}`,display:"flex",alignItems:"center",gap:10}}>
                <div className="user-avatar" style={{width:28,height:28,fontSize:11}}>{mgr[0]}</div>
                <span style={{fontFamily:"var(--font-d)",fontSize:13,fontWeight:700,color:T.text}}>{mgr}</span>
                <span style={{fontSize:11,color:T.muted,marginLeft:4}}>{mgrClients.length} clientes</span>
               </div>
               <div style={{padding:"12px 16px",display:"grid",gridTemplateColumns:"1fr 1fr",gap:16}}>
                {}
                <div>
                 <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:8}}>
                  <span className="platform-badge google" style={{fontSize:9}}>Google Ads</span>
                  <span style={{fontSize:10,color:T.muted}}>{googleAccounts.filter(a=>a.accountId).length} IDs configurados</span>
                 </div>
                 <div style={{display:"flex",flexDirection:"column",gap:4}}>
                  {mgrClients.map(c=>(
                   <div key={c.id} style={{display:"flex",alignItems:"center",gap:8,padding:"5px 8px",background:T.bg1,borderRadius:6,border:`1px solid ${T.border}`}}>
                    <span style={{flex:1,fontSize:11,color:T.text,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{c.name}</span>
                    <input placeholder="ID conta" value={c.info?.googleAccountId||""} readOnly
                     style={{width:110,background:"none",border:"none",color:c.info?.googleAccountId?T.green:T.muted2,fontSize:10,fontFamily:"var(--font-m)",textAlign:"right",outline:"none"}}/>
                    {c.info?.googleAccountId
                     ?<span style={{width:8,height:8,borderRadius:"50%",background:T.green,flexShrink:0,display:"inline-block"}}/>
                     :<span style={{width:8,height:8,borderRadius:"50%",background:T.muted2,flexShrink:0,display:"inline-block"}}/>}
                   </div>
                  ))}
                 </div>
                </div>
                {}
                <div>
                 <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:8}}>
                  <span className="platform-badge meta" style={{fontSize:9}}>Meta Ads</span>
                  <span style={{fontSize:10,color:T.muted}}>{metaAccounts.filter(a=>a.accountId).length} IDs configurados</span>
                 </div>
                 <div style={{display:"flex",flexDirection:"column",gap:4}}>
                  {mgrClients.map(c=>(
                   <div key={c.id} style={{display:"flex",alignItems:"center",gap:8,padding:"5px 8px",background:T.bg1,borderRadius:6,border:`1px solid ${T.border}`}}>
                    <span style={{flex:1,fontSize:11,color:T.text,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{c.name}</span>
                    <input placeholder="ID conta" value={c.info?.metaAccountId||""} readOnly
                     style={{width:110,background:"none",border:"none",color:c.info?.metaAccountId?T.green:T.muted2,fontSize:10,fontFamily:"var(--font-m)",textAlign:"right",outline:"none"}}/>
                    {c.info?.metaAccountId
                     ?<span style={{width:8,height:8,borderRadius:"50%",background:T.green,flexShrink:0,display:"inline-block"}}/>
                     :<span style={{width:8,height:8,borderRadius:"50%",background:T.muted2,flexShrink:0,display:"inline-block"}}/>}
                   </div>
                  ))}
                 </div>
                </div>
               </div>
               <div style={{padding:"8px 16px",background:T.bg3,borderTop:`1px solid ${T.border}`,fontSize:10,color:T.muted,display:"flex",alignItems:"center",gap:8}}>
                <span>💡 Para editar os IDs, vá em</span>
                <button className="edit-scope-btn" onClick={()=>setView("clients")} style={{fontSize:10}}>🗂 Aba Clientes</button>
               </div>
              </div>
             );
            })}
           </div>
          </div>
         </div>
        )}

        {}
        {settingsTab==="usuarios"&&(
         <div>
          <div className="settings-section">
           <div className="settings-section-header" style={{justifyContent:"space-between"}}>
            <span>👥 Usuários</span>
            <button className="btn-accent" style={{fontSize:11}} onClick={()=>setAddUserModal(true)}>+ Novo Usuário</button>
           </div>
           <div className="settings-body" style={{padding:"8px 20px"}}>
            {addUserModal&&(
             <div style={{background:T.bg2,border:`1px solid ${T.border2}`,borderRadius:10,padding:16,marginBottom:16}}>
              <div style={{fontFamily:"var(--font-d)",fontSize:13,fontWeight:700,marginBottom:14}}>Novo Usuário</div>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
               <div><label className="field-label">Nome</label><input className="field-input" 
                 style={{marginBottom:0}} 
                 value={newUserForm.name} 
                 onChange={e=>setNewUserForm(p=>({...p,name:e.target.value}))}/></div>
               <div><label className="field-label">Usuário</label><input className="field-input" 
                 style={{marginBottom:0}} 
                 value={newUserForm.username} 
                 onChange={e=>setNewUserForm(p=>({...p,username:e.target.value}))}/></div>
               <div><label className="field-label">Senha</label><input className="field-input" type="password" 
                 style={{marginBottom:0}} 
                 value={newUserForm.password} 
                 onChange={e=>setNewUserForm(p=>({...p,password:e.target.value}))}/></div>
               <div><label className="field-label">Cargo</label>
                <select className="field-input" style={{marginBottom:0}} value={newUserForm.role} onChange={e=>setNewUserForm(p=>({...p,role:e.target.value}))}>
                 <option value="Admin">Admin</option>
                 <option value="Gestor de Tráfego">Gestor de Tráfego</option>
                 <option value="Customer Success">Customer Success</option>
                </select>
               </div>
              </div>
              <div style={{display:"flex",gap:8,marginTop:12}}>
               <button className="btn-accent" onClick={()=>{
                if(!newUserForm.name||!newUserForm.username||!newUserForm.password) return;
                const newU={id:Date.now(),...newUserForm,manager:newUserForm.role==="Admin"?null:newUserForm.manager||"BRENDA"};
                setUsersState(p=>[...p,newU]);
                setNewUserForm({username:"",password:"",name:"",role:"Gestor de Tráfego",manager:""});
                setAddUserModal(false);
                showToast("✅","Usuário criado com sucesso");
               }}>Criar</button>
               <button className="btn-sm" onClick={()=>setAddUserModal(false)}>Cancelar</button>
              </div>
             </div>
            )}
            {usersState.map(u=>(
             <div key={u.id} className="user-row">
              <div style={{display:"flex",alignItems:"center",gap:12}}>
               {}
               <div className="user-avatar" style={{width:36,height:36,fontSize:13,overflow:"hidden",flexShrink:0}}>
                {u.photoUrl?<img src={u.photoUrl} style={{width:"100%",height:"100%",objectFit:"cover"}} onError={e=>e.target.style.display="none"} alt={u.name}/>:u.name[0]}
               </div>
               <div>
                <div style={{fontFamily:"var(--font-d)",fontSize:13,fontWeight:700,color:T.text}}>{u.name}</div>
                <div style={{fontSize:11,color:T.muted,marginTop:1}}>@{u.username}</div>
                {}
                <input placeholder="URL da foto (opcional)" value={u.photoUrl||""}
                 onChange={e=>setUsersState(p=>p.map(x=>x.id===u.id?{...x,photoUrl:e.target.value}:x))}
                 style={{marginTop:4,background:"none",border:`1px solid ${T.border}`,borderRadius:5,color:T.muted,padding:"3px 8px",fontSize:10,fontFamily:"var(--font-m)",outline:"none",width:220}}/>
               </div>
              </div>
              <div style={{display:"flex",alignItems:"center",gap:10}}>
               {}
               {u.username==="admin"?(
                <span style={{fontSize:11,fontWeight:700,padding:"4px 12px",borderRadius:20,background:`${T.green}15`,color:T.green,border:`1px solid ${T.green}30`}}>Admin</span>
               ):(
                <select value={u.role||"Gestor de Tráfego"}
                 onChange={e=>setUsersState(p=>p.map(x=>x.id===u.id?{...x,role:e.target.value}:x))}
                 
                   style={{background:T.bg2,border:`1px solid ${T.border2}`,borderRadius:20,color:T.accent,padding:"4px 12px",fontSize:11,fontFamily:"var(--font-d)",fontWeight:600,outline:"none",cursor:"pointer"}}>
                 <option value="Gestor de Tráfego">Gestor de Tráfego</option>
                 <option value="Customer Success">Customer Success</option>
                 <option value="Admin">Admin</option>
                </select>
               )}
               {u.username!=="admin"&&(
                <button className="edit-scope-btn" style={{color:T.red,borderColor:`${T.red}40`}}
                 onClick={()=>{setUsersState(p=>p.filter(x=>x.id!==u.id));showToast("🗑️","Usuário removido");}}>
                 Remover
                </button>
               )}
              </div>
             </div>
            ))}
           </div>
          </div>
         </div>
        )}

       </div>
      )}
     </div>
    </main>
   </div>

  </>
 );
}
