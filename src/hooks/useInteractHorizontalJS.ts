import interact from "interactjs";
import { useRef, useEffect, useState, CSSProperties } from "react";

type Partial<T> = {
  [P in keyof T]?: T[P];
};

const initPosition = {
  x: 0,
  y: 0,
};
// TODO: min, maxがnullなら無制限にする
// TODO: min, maxをyにも対応させる
// interactjs、	Androidだと正常に動かない、ちょっと動かすと止まる
// chrome開発者ツールのスマホモードだとiOS, Android関わらずちょっと動かすと止まる
// iOS端末上でのみモバイルは正常に動く
export function useInteractHorizontalJS(
  position: Partial<typeof initPosition> = initPosition,
  minPosition: any = initPosition,
  maxPosition: any = initPosition
) {
  const [_position, setPosition] = useState({
    ...initPosition,
    ...position,
  });
  const [_minPosition, setMinPosition] = useState({
    ...initPosition,
    ...minPosition,
  });
  const [_maxPosition, setMaxPosition] = useState({
    ...initPosition,
    ...maxPosition,
  });

  const interactRef = useRef<HTMLElement | null>(null);
  let { x, y } = _position;

  const enable = () => {
    interact(interactRef.current as unknown as HTMLElement)
      .draggable({
        inertia: false,
      })
      .on("dragmove", (event) => {
        x += event.dx;
        y += event.dy;
        if (x >= _minPosition.x && x <= _maxPosition.x) {
          setPosition({
            x: x,
            y: _minPosition.y,
          });
        }

        if (x < _minPosition.x) {
          setPosition({
            x: _minPosition.x,
            y: _minPosition.y,
          });
        }

        if (x > _maxPosition.x) {
          setPosition({
            x: _maxPosition.x,
            y: _minPosition.y,
          });
        }
      });
  };

  const disable = () => {
    interact(interactRef.current as unknown as HTMLElement).unset();
  };

  useEffect(() => {
    return disable;
  }, []);

  return {
    ref: interactRef,
    style: {
      transform: `translate3D(${_position.x}px, ${_position.y}px, 0)`,
      position: "absolute" as CSSProperties["position"],
    },
    position: _position,
    minPosition: _minPosition,
    maxPosition: _maxPosition,
    enable,
    disable,
    setPosition,
    setMinPosition,
    setMaxPosition,
  };
}
