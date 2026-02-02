import { Suspense, type ComponentType, type LazyExoticComponent } from "react";
import { Spin } from "antd";

const LazyLoadFallback = () => (
  <div className="flex items-center justify-center min-h-[200px]">
    <Spin size="large" />
  </div>
);

const Loadable = <P extends object>(
  Component: LazyExoticComponent<ComponentType<P>>
) => {
  const LoadableComponent = (props: P) => (
    <Suspense fallback={<LazyLoadFallback />}>
      <Component {...props} />
    </Suspense>
  );

  return LoadableComponent;
};

export { Loadable, LazyLoadFallback };
