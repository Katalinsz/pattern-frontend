import React, { useRef, useState, useEffect } from "react";
import {
  Stage,
  Layer,
  Image as KonvaImage,
  Transformer,
  Group,
} from "react-konva";
import useImage from "use-image";
import simpleSweater from "../assets/simpleSweater.png";
import motif1 from "../assets/motif1.jpg";
import { Lock, Unlock } from "lucide-react";

export default function SweaterDesigner() {
  const transformerRef = useRef();
  const motifRef = useRef();

  const [sweaterImg] = useImage(simpleSweater);
  const [motifImg] = useImage(motif1);

  const SWEATER_POS = { x: 50, y: 50 };
  const SWEATER_SIZE = { width: 500, height: 500 };

  const defaultMotifProps = {
    x: 150,
    y: 150,
    width: 150,
    height: 150,
  };

  const [motifProps, setMotifProps] = useState(() => {
    const saved = localStorage.getItem("motifProps");
    return saved ? JSON.parse(saved) : defaultMotifProps;
  });

  const [isLocked, setIsLocked] = useState(() => {
    const saved = localStorage.getItem("isLocked");
    return saved ? JSON.parse(saved) : false;
  });

  useEffect(() => {
    localStorage.setItem("motifProps", JSON.stringify(motifProps));
  }, [motifProps]);

  useEffect(() => {
    localStorage.setItem("isLocked", JSON.stringify(isLocked));
  }, [isLocked]);

  useEffect(() => {
    if (!isLocked && motifRef.current && transformerRef.current) {
      transformerRef.current.nodes([motifRef.current]);
      transformerRef.current.getLayer().batchDraw();
    }
  }, [isLocked, motifImg]);

  const handleDragBound = (pos) => {
    // Calculate boundaries based on sweater position and size
    const minX = SWEATER_POS.x;
    const minY = SWEATER_POS.y;
    const maxX = SWEATER_POS.x + SWEATER_SIZE.width - motifProps.width;
    const maxY = SWEATER_POS.y + SWEATER_SIZE.height - motifProps.height;

    return {
      x: Math.max(minX, Math.min(pos.x, maxX)),
      y: Math.max(minY, Math.min(pos.y, maxY)),
    };
  };

  const handleTransformBound = (oldBox, newBox) => {
    // Prevent scaling beyond sweater boundaries
    const minX = SWEATER_POS.x;
    const minY = SWEATER_POS.y;
    const maxX = SWEATER_POS.x + SWEATER_SIZE.width;
    const maxY = SWEATER_POS.y + SWEATER_SIZE.height;

    // Minimum size
    if (newBox.width < 20 || newBox.height < 20) {
      return oldBox;
    }

    // Check if the transformed box is within sweater boundaries
    if (
      newBox.x < minX ||
      newBox.y < minY ||
      newBox.x + newBox.width > maxX ||
      newBox.y + newBox.height > maxY
    ) {
      return oldBox;
    }

    return newBox;
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 py-8">
      <div className="text-center">
        <h2 className="text-xl font-bold mb-4">Sweater Designer</h2>

        <div className="relative group w-fit mx-auto">
          <button
            onClick={() => setIsLocked(!isLocked)}
            className="absolute top-2 right-2 z-20 bg-white/80 hover:bg-white text-gray-700 p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-md"
            title={isLocked ? "Unlock Motif" : "Lock Motif"}
          >
            {isLocked ? <Lock size={16} /> : <Unlock size={16} />}
          </button>

          <Stage
            width={600}
            height={600}
            className="border border-gray-300 rounded-md"
          >
            <Layer>
              {/* Sweater image */}
              {sweaterImg && (
                <KonvaImage
                  image={sweaterImg}
                  x={SWEATER_POS.x}
                  y={SWEATER_POS.y}
                  width={SWEATER_SIZE.width}
                  height={SWEATER_SIZE.height}
                />
              )}

              {/* Motif */}
              <KonvaImage
                image={motifImg}
                ref={motifRef}
                {...motifProps}
                draggable={!isLocked}
                dragBoundFunc={handleDragBound}
                onDragEnd={(e) => {
                  if (isLocked) return;
                  setMotifProps((prev) => ({
                    ...prev,
                    x: e.target.x(),
                    y: e.target.y(),
                  }));
                }}
                onTransformEnd={(e) => {
                  if (isLocked) return;
                  const node = motifRef.current;
                  const scaleX = node.scaleX();
                  const scaleY = node.scaleY();
                  node.scaleX(1);
                  node.scaleY(1);

                  const newWidth = Math.max(20, node.width() * scaleX);
                  const newHeight = Math.max(20, node.height() * scaleY);

                  // Calculate new position to keep within sweater bounds
                  const newX = Math.max(
                    SWEATER_POS.x,
                    Math.min(
                      node.x(),
                      SWEATER_POS.x + SWEATER_SIZE.width - newWidth
                    )
                  );
                  const newY = Math.max(
                    SWEATER_POS.y,
                    Math.min(
                      node.y(),
                      SWEATER_POS.y + SWEATER_SIZE.height - newHeight
                    )
                  );

                  setMotifProps({
                    x: newX,
                    y: newY,
                    width: newWidth,
                    height: newHeight,
                  });
                }}
              />

              {/* Transformer */}
              {!isLocked && (
                <Transformer
                  ref={transformerRef}
                  boundBoxFunc={handleTransformBound}
                />
              )}
            </Layer>
          </Stage>
        </div>
      </div>
    </div>
  );
}
