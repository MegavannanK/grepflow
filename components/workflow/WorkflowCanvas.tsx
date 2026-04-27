"use client";

import React, { useCallback } from "react";
import ReactFlow, {
  Background,
  Controls,
  addEdge,
  useNodesState,
  useEdgesState,
  Connection,
  Edge,
  Position,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";

const CustomNode = ({ data }: any) => {
  return (
    <div className="px-4 py-3 rounded-xl border border-white/10 
      bg-gradient-to-br from-blue-500/20 to-purple-500/20
      backdrop-blur-xl text-white shadow-[0_0_15px_rgba(99,102,241,0.6)]
      hover:scale-105 transition-all">
      <p className="font-semibold">{data.label}</p>
    </div>
  );
};

const initialNodes = [
  {
    id: "1",
    position: { x: 100, y: 100 },
    data: { label: "Input" },
    type: "custom",
    sourcePosition: Position.Right,
  },
  {
    id: "2",
    position: { x: 350, y: 200 },
    data: { label: "LLM Agent" },
    type: "custom",
    sourcePosition: Position.Right,
    targetPosition: Position.Left,
  },
  {
    id: "3",
    position: { x: 650, y: 100 },
    data: { label: "Output" },
    type: "custom",
    targetPosition: Position.Left,
  },
];

const initialEdges = [
  {
    id: "e1-2",
    source: "1",
    target: "2",
    animated: true,
    style: {
      stroke: "#3b82f6",
      strokeWidth: 2,
      filter: "drop-shadow(0 0 6px #3b82f6)",
    },
  },
];

export default function WorkflowCanvas() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    (params: Edge | Connection) =>
      setEdges((eds) =>
        addEdge(
          {
            ...params,
            animated: true,
            style: {
              stroke: "#8b5cf6",
              strokeWidth: 2,
              filter: "drop-shadow(0 0 6px #8b5cf6)",
            },
          },
          eds
        )
      ),
    [setEdges]
  );

  return (
    <div className="h-full w-full">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={{ custom: CustomNode }}
        fitView
      >
        <Background gap={20} size={1} />
        <Controls />
      </ReactFlow>
    </div>
  );
}
