## TTRank (스타크래프트 MMR 전적 / 승점 기록 사이트)

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/pages/api-reference/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```
## Command

```
cd [파일명]
git pull
npm install                       // 모듈 설치
npx prisma generate               // prisma 생성
npm run build                     // 노드 빌드

forever list
forever stop [forever_idx]        // forever 정지
ps -ef | grep next                // 프로세스 조회
pkill -f "next start -p [포트번호]" // 서버 여러개 켰을 시 next-server 찾기 어려움 -> 이 코드로 자식 kill
// 해당 dev 서버는 3003 사용중
ps -ef | grep next
kill -9 [pid]                     // 자식이 1인 pid 찾아서 부모 kill

forever start start.js            // forever 실행
```

