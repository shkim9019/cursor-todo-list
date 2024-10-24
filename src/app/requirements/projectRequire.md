# Todo-List 프로젝트 프롬프트

이 프로젝트는 Next.js 13+와 React 18+를 사용하여 구현되는 Todo-List 애플리케이션입니다. 서버 컴포넌트와 클라이언트 컴포넌트를 적절히 활용하여 최적의 성능을 제공합니다.

## 프로젝트 구조 및 구현

1. **프레임워크**: Next.js 13+ (App Router)
2. **상태 관리**: Recoil을 사용하여 전역 상태를 관리합니다.
3. **폴더 구조**:
    - `src/app`: Next.js 13+ App Router 구조
    - `src/components`: 재사용 가능한 React 컴포넌트
    - `src/lib`: 유틸리티 함수 및 커스텀 훅
    - `src/styles`: 전역 스타일 및 Tailwind 설정
4. **컴포넌트 구현**:
    - 모든 컴포넌트는 `src/components` 디렉토리에 위치합니다.
    - 클라이언트 컴포넌트는 파일 최상단에 `"use client";`를 명시합니다.
5. **상태 관리**:
    - Recoil을 사용하여 전역 상태를 관리합니다.
    - `src/lib/atoms.ts` 파일에 모든 atom을 정의합니다.
6. **스타일링**:
    - Tailwind CSS를 사용하여 스타일링합니다.
7. **성능 최적화**:
    - 서버 컴포넌트를 최대한 활용하여 초기 로딩 성능을 개선합니다.
    - 동적 import를 사용하여 필요한 경우에만 컴포넌트를 로드합니다.
8. **로직 라이브러리**:
    - 로직과 관련된 라이브러리로는 lodash를 사용합니다.

## 스타일링 가이드라인

1. **스타일링 라이브러리**: 모든 스타일링은 **Tailwind CSS**와 **Shadcn 라이브러리**를 통해 관리합니다.
2. **색상 팔레트**:
    - 프로젝트의 주요 색상 팔레트는 다음과 같습니다:
        - `#697F8C`
        - `#D8F0F2`
        - `#C1D6D9`
        - `#A69286`
        - `#0D0D0D`
    - 이 색상들은 **Tailwind CSS 설정 파일**(`tailwind.config.ts`)에 정의되어 있으며, 일관된 색상 사용을 보장합니다.

## 주의사항

1. React 훅은 반드시 컴포넌트의 최상위 레벨에서만 사용해야 합니다.
2. 서버 컴포넌트에서는 상태 관리 라이브러리를 직접 사용할 수 없습니다. 필요한 경우 클라이언트 컴포넌트로 래핑해야 합니다.
3. Next.js의 App Router 구조를 따라 페이지와 레이아웃을 구성합니다.