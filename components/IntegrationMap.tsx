'use client';

import React, { useCallback, useState, useEffect } from 'react';
import ReactFlow, {
  Node,
  Edge,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  MiniMap,
  Panel,
} from 'reactflow';
import dagre from 'dagre';
import 'reactflow/dist/style.css';

import { ApplicationNode, applicationsToGraphNodes, relationsToGraphEdges, getIntegrationTypes, getCriticalityLevels } from '@/lib/graphDataTransform';

interface IntegrationMapProps {
  applications: ApplicationNode[];
}

const CRITICALITY_COLORS_MAP: Record<string, string> = {
  missionCritical: '#ef4444',
  businessCritical: '#f59e0b',
  businessOperational: '#3b82f6',
  administrativeService: '#6b7280',
};

const getLayoutedElements = (nodes: Node[], edges: Edge[]) => {
  try {
    const dagreGraph = new dagre.graphlib.Graph({ compound: true });
    dagreGraph.setGraph({ rankdir: 'TB', ranksep: 150, nodesep: 100 });

    nodes.forEach((node) => {
      dagreGraph.setNode(node.id, { width: 150, height: 150 });
    });

    edges.forEach((edge) => {
      dagreGraph.setEdge(edge.source, edge.target);
    });

    dagre.layout(dagreGraph);

    const layoutedNodes = nodes.map((node, index) => {
      const nodeWithPosition = dagreGraph.node(node.id);

      // Fallback if dagre didn't position the node
      if (!nodeWithPosition) {
        return {
          ...node,
          position: {
            x: (index % 4) * 300,
            y: Math.floor(index / 4) * 300,
          },
        };
      }

      return {
        ...node,
        position: {
          x: nodeWithPosition.x - 75,
          y: nodeWithPosition.y - 75,
        },
      };
    });

    return { nodes: layoutedNodes, edges };
  } catch (error) {
    console.error('Dagre layout error:', error);
    // Return nodes with grid fallback layout if dagre fails
    return {
      nodes: nodes.map((node, index) => ({
        ...node,
        position: {
          x: (index % 4) * 300,
          y: Math.floor(index / 4) * 300,
        },
      })),
      edges,
    };
  }
};

export function IntegrationMap({ applications }: IntegrationMapProps) {
  const initialNodes = applicationsToGraphNodes(applications);
  const initialEdges = relationsToGraphEdges(applications);
  const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(initialNodes, initialEdges);

  const [nodes, setNodes, onNodesChange] = useNodesState(layoutedNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(layoutedEdges);
  const [selectedNode, setSelectedNode] = useState<ApplicationNode | null>(null);

  const integrationTypes = getIntegrationTypes(applications);
  const criticalityLevels = getCriticalityLevels(applications);

  const onNodeClick = useCallback(
    (event: React.MouseEvent, node: Node) => {
      const app = applications.find((a) => a.id === node.id);
      if (app) {
        setSelectedNode(app);
      }
    },
    [applications]
  );

  return (
    <div className="w-full h-screen flex flex-col bg-gray-50">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onNodeClick={onNodeClick}
        defaultViewport={{ x: 0, y: 0, zoom: 0.7 }}
        minZoom={0.2}
        maxZoom={2}
      >
        <Background color="#aaa" gap={16} />
        <Controls />
        <MiniMap />

        {/* Legends and Controls Panel */}
        <Panel position="top-left" className="bg-white rounded-lg shadow-lg p-4 max-w-xs">
          <div className="space-y-4">
            {/* Criticality Legend */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-3 text-sm">Business Criticality</h3>
              <div className="space-y-2">
                {criticalityLevels.map((level) => (
                  <div key={level} className="flex items-center gap-3">
                    <div
                      className="w-4 h-4 rounded-full"
                      style={{ backgroundColor: CRITICALITY_COLORS_MAP[level] || '#3b82f6' }}
                    />
                    <span className="text-xs text-gray-700 capitalize">{level.replace(/([A-Z])/g, ' $1')}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Integration Types Legend */}
            {integrationTypes.length > 0 && (
              <div>
                <h3 className="font-semibold text-gray-900 mb-3 text-sm border-t pt-4">Integration Types</h3>
                <div className="space-y-2">
                  {integrationTypes.map((type) => (
                    <div key={type} className="flex items-center gap-3">
                      <div className="w-6 h-0.5 bg-gray-400" style={{ backgroundColor: '#3b82f6' }} />
                      <span className="text-xs text-gray-700">{type}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Info Text */}
            <div className="border-t pt-3">
              <p className="text-xs text-gray-500">
                💡 Click any bubble to see application details
              </p>
            </div>
          </div>
        </Panel>

        {/* Details Panel */}
        {selectedNode && (
          <Panel position="top-right" className="bg-white rounded-lg shadow-lg p-4 max-w-sm">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-gray-900">{selectedNode.displayName}</h3>
                <button
                  onClick={() => setSelectedNode(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>

              <p className="text-xs text-gray-600">{selectedNode.description || 'No description'}</p>

              {/* Metrics */}
              <div className="grid grid-cols-2 gap-2 text-xs border-t pt-3">
                <div>
                  <span className="text-gray-500">Criticality:</span>
                  <p className="font-semibold text-gray-900 capitalize">
                    {selectedNode.businessCriticality?.replace(/([A-Z])/g, ' $1')}
                  </p>
                </div>
                <div>
                  <span className="text-gray-500">Technical:</span>
                  <p className="font-semibold text-gray-900 capitalize">
                    {selectedNode.technicalSuitability?.replace(/([A-Z])/g, ' $1')}
                  </p>
                </div>
                <div>
                  <span className="text-gray-500">Functional:</span>
                  <p className="font-semibold text-gray-900 capitalize">
                    {selectedNode.functionalSuitability?.replace(/([A-Z])/g, ' $1')}
                  </p>
                </div>
                <div>
                  <span className="text-gray-500">State:</span>
                  <p className="font-semibold text-gray-900">{selectedNode.state}</p>
                </div>
              </div>

              {/* Integrations */}
              {selectedNode.integrations && selectedNode.integrations.length > 0 && (
                <div className="border-t pt-3">
                  <h4 className="font-semibold text-gray-900 text-xs mb-2">Integrations ({selectedNode.integrations.length})</h4>
                  <div className="space-y-2 max-h-40 overflow-y-auto">
                    {selectedNode.integrations.map((integration, idx) => {
                      const targetApp = applications.find((a) => a.id === integration.targetAppId);
                      return (
                        <div
                          key={idx}
                          className="p-2 bg-gray-50 rounded text-xs border border-gray-200"
                        >
                          <div className="font-semibold text-gray-900">
                            →{' '}
                            <span className="text-blue-600">
                              {targetApp?.displayName || 'Unknown'}
                            </span>
                          </div>
                          <div className="text-gray-600 mt-1">
                            <span className="inline-block px-2 py-0.5 bg-blue-50 text-blue-700 rounded text-xs font-medium">
                              {integration.type}
                            </span>
                          </div>
                          <div className="text-gray-500 mt-1">{integration.description}</div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </Panel>
        )}
      </ReactFlow>
    </div>
  );
}
