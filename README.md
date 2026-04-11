# notTomorrowClub

> Daily English learning web app focused on habit formation through small, repeatable actions.

---

## Overview

notTomorrowClub은 매일 5개의 문장으로 시작하는 영어 학습 서비스입니다.
복잡한 커리큘럼 없이, 최소 단위의 학습과 복습을 반복하는 구조에 집중했습니다.

사용자는 하루 5문장을 학습하고, 같은 날 복습을 통해 기억을 강화합니다.
이 단순한 루틴을 반복하며 자연스럽게 학습 습관을 만드는 것을 목표로 합니다.

---

## Problem

영어 공부를 시작할 때 많은 사용자가 준비 과정에서 멈춥니다.

- 앱을 비교하고
- 커리큘럼을 고민하고
- 완벽한 타이밍을 기다리다가

결국 학습을 시작하지 못하고 "내일부터"로 미루게 됩니다.

---

## Solution

notTomorrowClub은 시작 장벽을 낮추기 위해 최소 단위의 학습 경험을 제공합니다.

| 단계             | 목적           |
| ---------------- | -------------- |
| 하루 5문장       | 부담 없는 시작 |
| 당일 복습        | 기억 강화      |
| 반복 가능한 구조 | 습관 형성      |

사용자가 고민 없이 바로 시작하고, "오늘 해야 할 것"에만 집중할 수 있도록 설계했습니다.

---

## Core Flow

```
Learning → Review → Repeat (Daily)
```

- **Learning** — 하루 5문장 학습
- **Review** — 학습 문장 기반 복습
- **Repeat** — 동일한 루틴을 매일 반복

---

## Features

### Learning

- 하루 5문장 제공
- 단계별 진행 (step 기반 라우팅)
- 한국어 번역 토글
- 핵심 단어 강조

### Review

- 학습 문장 기반 퀴즈
- 단어 중심 문제 구성
- 능동적 회상(Active Recall) 구조

---

## Tech Stack

```
Frontend   React 19 + Vite
Routing    React Router DOM v7
Styling    Tailwind CSS v4
Animation  GSAP + CSS
API        Axios
Deploy     Vercel
```

---

## Project Structure

```
src/
├── api/              # API layer
├── components/
│   ├── common/       # shared UI components
│   ├── learning/     # learning flow components
│   ├── review/       # review flow components
│   └── main/         # main page components
├── context/          # global state (learning data)
├── hooks/            # custom hooks
├── pages/            # route-based pages
└── router/           # routing configuration
```

---

## Installation

```bash
# 패키지 설치
npm install

# 개발 서버 실행
npm run dev

# 프로덕션 빌드
npm run build

# 빌드 미리보기
npm run preview
```

---
