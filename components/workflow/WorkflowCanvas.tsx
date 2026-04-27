"use client";

import React, { useEffect, useState } from "react";
import ReactFlow, {
  Background,
  Controls,
  Node,
  Edge,
  Position,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";

const CustomNode = ({ data, selected }: any) => {
  return (
    <div
      className={\`px-4 py-3 rounded-xl border transition-all duration-300
      \${selected
        ? "bg-gradient-to-br from-blue-500 to-purple-600 shadow-[0_0_25px_rgba(99,102,241,0.9)] border-white/40 scale-105"
        : "bg-white/5 border-white/10 hover:scale-105 hover:shadow-[0_0_15px_rgba(99,102,241,0.6)]"}\`}
    >
      <div className="text-sm font-semibold text-white">
        {data.label}
      </div>
    </div>
  );
};

const initialNodes: Node[] = [
  { id: "1", position: { x: 100, y: 150 }, data: { label: "Input" }, type: "custom", sourcePosition: Position.Right },
  { id: "2", position: { x: 350, y: 250 }, data: { label: "LLM Agent" }, type: "custom", sourcePosition: Position.Right, targetPosition: Position.Left },
  { id: "3", position: { x: 650, y: 150 }, data: { label: "Tool" }, type: "custom", sourcePosition: Position.Right, targetPosition: Position.Left },
  { id: "4", position: { x: 900, y: 250 }, data: { label: "Output" }, type: "custom", targetPosition: Position.Left },
];

const initialEdges: Edge[] = [
  { id: "e1-2", source: "1", target: "2", animated: true, style: { stroke: "#3b82f6", strokeWidth: 2, filter: "drop-shadow(0 0 8px #3b82f6)" } },
  { id: "e2-3", source: "2", target: "3", animated: true, style: { stroke: "#8b5cf6", strokeWidth: 2, filter: "drop-shadow(0 0 8px #8b5cf6)" } },
  { id: "e3-4", source: "3", target: "4", animated: true, style: { stroke: "#22c55e", strokeWidth: 2, filter: "drop-shadow(0 0 8px #22c55e)" } },
];

export default function WorkflowCanvas() {
  const [nodes, setNodes] = useState(initialNodes);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % initialNodes.length);
    }, 1200);
    return () => clearInterval(interval);
  }, []);

  const animatedNodes = nodes.map((node, index) => ({
    ...node,
    selected: index === activeIndex,
  }));

  return (
    <div className="h-full w-full">
      <ReactFlow
        nodes={animatedNodes}
        edges={initialEdges}
        nodeTypes={{ custom: CustomNode }}
        fitView
      >
        <Background gap={20} size={1} />
        <Controls />
      </ReactFlow>
    </div>
  );
}
