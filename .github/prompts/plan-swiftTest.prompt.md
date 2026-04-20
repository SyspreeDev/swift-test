# Plan: Optimize React UI Performance & Fix Lag

## TL;DR
Your project has **4 critical bottlenecks** causing cascading re-renders, unthrottled event listeners, and unused dependencies (500KB+). The fix prioritizes: (1) consolidating mouse/scroll listeners, (2) throttling uncontrolled events, (3) memoizing components, (4) removing unused dependencies, (5) lazy-loading below-fold components. Verify each fix with browser DevTools and real-device testing (mobile-first).

---

## Steps

### **Phase 1: Fix Event Listener Bottlenecks** (Parallel tasks 1-4, enables later phases)

1. **Activate unused MouseContext Provider** - The codebase has `Mousecontext.tsx` using Framer Motion's optimized MotionValues but the Provider isn't being used. This eliminates 3/4 duplicate mousemove listeners in one change.
   - Wrap `<App>` in `<MouseProvider>` in [src/main.tsx](src/main.tsx)
   - Remove direct `mousemove` listeners from:
     - [src/app/components/AnimatedOrnament.tsx](src/app/components/AnimatedOrnament.tsx) (~line 10)
     - [src/app/components/BackgroundAnimations.tsx](src/app/components/BackgroundAnimations.tsx) (~line 18)
     - [src/app/components/InteractiveDecorations.tsx](src/app/components/InteractiveDecorations.tsx) (~line 37)
   - Replace removed listeners with imports from `Mousecontext` (export mouse position values)
   - **Verification**: Browser DevTools → Performance tab → Record page interaction → Check for 75% fewer mousemove handler calls

2. **Add throttling to CADFloatingElements unthrottled mousemove** - This component fires setState on EVERY mousemove event (no throttle).
   - Modify [src/app/components/CADFloatingElements.tsx](src/app/components/CADFloatingElements.tsx#L228) to use `rafThrottle()` from [src/app/utils/performance.ts](src/app/utils/performance.ts)
   - Wrap `setMousePosition` in `rafThrottle()` (60fps cap on mouse tracking)
   - **Verification**: Smooth 60fps mousemove handling in DevTools Performance tab

3. **Consolidate scroll listeners** - Multiple components have independent scroll listeners.
   - Audit [src/app/components/InteractiveDecorations.tsx](src/app/components/InteractiveDecorations.tsx#L50) (scroll listener)
   - Audit [src/app/components/ScrollProgressIndicator.tsx](src/app/components/ScrollProgressIndicator.tsx#L22) (scroll listener)
   - Create a single shared scroll context or consolidate into one component
   - Replace duplicates with shared hook
   - **Verification**: DevTools → Performance → Single scroll event handler in call stack

4. **Verify device performance tier detection is being used** - `getDevicePerformanceTier()` and `prefersReducedMotion()` exist but check actual usage in components.
   - Search for usage of `getDevicePerformanceTier()` across components
   - Ensure low-end device animations are disabled (reference: [src/app/App.tsx#L263-L275](src/app/App.tsx#L263-L275))
   - Add fallback logic if not used consistently
   - **Verification**: Test on low-end device/throttled CPU → animations should be disabled

---

### **Phase 2: Add React.memo to Prevent Unnecessary Re-renders** (Depends on Phase 1)

5. **Wrap section components with React.memo** - Most section components re-render when parent updates even if their props don't change.
   - List of components to memo (high re-render impact):
     - [src/app/components/ProductsSection.tsx](src/app/components/ProductsSection.tsx) (high state churn)
     - [src/app/components/BrandsSection.tsx](src/app/components/BrandsSection.tsx) (carousel state)
     - [src/app/components/HeroSection.tsx](src/app/components/HeroSection.tsx) (video + mobile detection)
     - [src/app/components/FormSection.tsx](src/app/components/FormSection.tsx)
     - [src/app/components/TestimonialsSection.tsx](src/app/components/TestimonialsSection.tsx)
     - [src/app/components/FAQSection.tsx](src/app/components/FAQSection.tsx)
     - [src/app/components/GallerySection.tsx](src/app/components/GallerySection.tsx)
   - Add custom `areEqual()` comparison for complex props (e.g., arrays, objects)
   - **Verification**: DevTools → Profiler tab → Compare render counts before/after (should drop 40-60% for lower sections)

---

### **Phase 3: Remove Unused Dependencies** (Parallel with Phase 2)

6. **Remove MUI + Emotion if truly unused** - Analysis found `@mui/material` and `@emotion/*` imported but not used in components.
   - Search codebase for actual MUI component imports (e.g., `from '@mui/material'`)
   - If not found, remove from [package.json](package.json): `@mui/material`, `@emotion/react`, `@emotion/styled`
   - Run `npm install` to update lock file
   - **Verification**: `npm run build` → Check bundle size reduction (expect ~100KB savings)

7. **Remove or optimize heavy carousel library** - `react-slick` + `slick-carousel` used only in ProductsSection.
   - Option A: Check if `react-slick` is truly necessary in [ProductsSection.tsx](src/app/components/ProductsSection.tsx)
   - Option B: If yes, ensure it's code-split and lazy-loaded
   - If unused, remove from package.json
   - **Verification**: Bundle analysis tool (e.g., `npm install -D rollup-plugin-visualizer`) to confirm removal

8. **Identify unused Radix UI imports** - Project imports 30+ Radix UI components but likely uses only ~60%.
   - Check which Radix UI components are actually imported in components
   - Remove unused from [package.json](package.json) (e.g., `@radix-ui/react-tabs`, `@radix-ui/react-slider` if not used)
   - **Verification**: Tree-shake analysis in build output

---

### **Phase 4: Code Splitting & Lazy Loading** (Depends on Phase 1-3)

9. **Lazy-load LeadForm component** - 400+ lines, below the fold, eagerly loaded.
   - Modify [src/app/components/FormSection.tsx](src/app/components/FormSection.tsx) to use `React.lazy()` for LeadForm import
   - Wrap with `<Suspense fallback={<div>Loading form...</div>}>`
   - **Verification**: Network tab → LeadForm chunk loads only when FormSection scrolls into view

10. **Lazy-load ProductsSection** - 400+ lines, high state churn, should load on demand.
    - Modify [src/app/App.tsx](src/app/App.tsx) to lazy-load ProductsSection
    - Add Suspense boundary
    - **Verification**: Network tab → ProductsSection chunk loads when needed

11. **Consolidate SVG imports** - 60+ Figma-generated SVG components ([src/imports/](src/imports/)) are eagerly imported.
    - Audit which SVG components are actually used in components
    - Move unused ones to a separate unused/ folder or document them
    - For heavily used SVGs, keep inline; for occasional use, consider dynamic imports
    - **Verification**: Check [src/imports/](src/imports/) usage across codebase (grep for Frame42, Frame43, etc.)

---

### **Phase 5: Verify & Test Performance Improvements** (After all phases)

12. **Performance benchmarking before/after**
    - Browser DevTools → Performance tab → Record 5-second interaction (scroll + mouse move)
    - Record metrics: FCP (First Contentful Paint), LCP (Largest Contentful Paint), CLS (Cumulative Layout Shift), FID (First Input Delay)
    - Run on: Desktop Chrome (normal), Chrome (throttled 4G), Mobile device (low-end Android)
    - **Expected results**: 30-50% improvement in FCP/LCP, smooth 60fps scrolling/animations

13. **Mobile-specific testing**
    - Test on low-end Android device (e.g., Android 10, 2GB RAM)
    - Verify animations are disabled via `getDevicePerformanceTier()`
    - Check scroll/mouse interactions feel responsive
    - **Expected result**: No jank, animations optional based on device tier

14. **Bundle size analysis**
    - Run `npm run build` and compare bundle sizes:
      - Before: ~800KB-1MB (rough estimate)
      - After: Target ~500-600KB
    - Use `npm install -D rollup-plugin-visualizer && npm run build` to visualize chunks
    - **Verification**: No chunk >400KB (Vite warning limit)

---

## Relevant Files

- **Core Performance Utilities**: [src/app/utils/performance.ts](src/app/utils/performance.ts) — Contains `throttle()`, `rafThrottle()`, `getDevicePerformanceTier()`, `prefersReducedMotion()`
- **Mouse Context (Unused)**: [src/app/context/Mousecontext.tsx](src/app/context/Mousecontext.tsx) — Implement MotionValues for mouse tracking (fix for duplicate listeners)
- **Heavy Components**: [src/app/components/ProductsSection.tsx](src/app/components/ProductsSection.tsx), [src/app/components/LeadForm.tsx](src/app/components/LeadForm.tsx), [src/app/components/InteractiveDecorations.tsx](src/app/components/InteractiveDecorations.tsx)
- **Build Config**: [vite.config.ts](vite.config.ts) — Already has chunk splitting; review after dependency removal
- **App Entry**: [src/app/App.tsx](src/app/App.tsx) — Wrap with MouseProvider, apply lazy loading
- **Dependencies**: [package.json](package.json) — Remove MUI, Emotion, possibly react-slick

---

## Verification

1. **Phase 1**: DevTools Performance tab shows 75% fewer mousemove handlers; 60fps mousemove tracking
2. **Phase 2**: Profiler tab shows 40-60% fewer re-renders for lower sections
3. **Phase 3**: Bundle size reduced by 100-200KB (npm run build output)
4. **Phase 4**: Network tab shows lazy-loaded chunks only appear on scroll
5. **Phase 5**: Before/after performance metrics show 30-50% improvement in FCP/LCP; smooth 60fps on mobile

---

## Decisions

- **Approach**: Fix event listeners (quick win) → memoization (medium effort) → dependency cleanup (high effort) → lazy loading (low effort) → test comprehensively
- **Device Priority**: Mobile-first optimization (disable animations on low-end, test real devices)
- **MouseContext**: Activate existing implementation instead of rewriting (DRY principle)
- **Scope Included**: Event listener consolidation, component memoization, unused dependency removal, lazy loading, performance verification
- **Scope Excluded**: Rewriting animations from scratch, changing build tool (Vite is good), moving to state manager (postpone for future)

---

## Further Considerations

1. **PostCSS Build Performance**: [postcss.config.mjs](postcss.config.mjs) may have heavy plugins (TailwindCSS?). Should we audit build time separately?
   - Recommendation: Yes, if CSS build time >2s, audit after UI fixes

2. **Form Duplication**: LeadForm.tsx and LeadFormAndroid.tsx are separate 400+ line components. Should we consolidate to one responsive form?
   - Recommendation: Consolidate after Phase 4 to reduce duplication (future task)

3. **Animation Library**: Are all Framer Motion animations necessary? Could we reduce animation scope on mobile?
   - Recommendation: Already partially addressed by `prefersReducedMotion()`, but audit component animations during Phase 5 testing
