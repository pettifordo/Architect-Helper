import { Node, Edge } from 'reactflow';

export interface ApplicationNode {
  id: string;
  displayName: string;
  description?: string;
  businessCriticality: string;
  technicalSuitability: string;
  functionalSuitability: string;
  state: string;
  lxHostingType?: string;
  lxSixRClassification?: string;
  integrations?: Integration[];
}

export interface Integration {
  targetAppId: string;
  type: string;
  direction: string;
  description: string;
}

// Color mapping for business criticality
const CRITICALITY_COLORS: Record<string, string> = {
  missionCritical: '#ef4444', // red-500
  businessCritical: '#f59e0b', // amber-500
  businessOperational: '#3b82f6', // blue-500
  administrativeService: '#6b7280', // gray-500
};

// Color mapping for technical suitability
const SUITABILITY_SIZES: Record<string, number> = {
  perfect: 150,
  fullyAppropriate: 140,
  appropriate: 130,
  adequate: 120,
  unreasonable: 110,
  insufficient: 100,
  inappropriate: 90,
  unknown: 120,
};

// Convert applications to React Flow nodes
export function applicationsToGraphNodes(apps: ApplicationNode[]): Node[] {
  return apps.map((app) => {
    const size = SUITABILITY_SIZES[app.technicalSuitability] || 120;
    const color = CRITICALITY_COLORS[app.businessCriticality] || '#3b82f6';

    return {
      id: app.id,
      data: {
        label: app.displayName,
        criticality: app.businessCriticality,
        suitability: app.technicalSuitability,
        functionalSuitability: app.functionalSuitability,
      },
      position: { x: 0, y: 0 }, // Will be arranged by dagre layout
      style: {
        width: size,
        height: size,
        borderRadius: '50%',
        backgroundColor: color,
        color: 'white',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '8px',
        fontSize: '12px',
        fontWeight: 600,
        cursor: 'pointer',
        border: '3px solid white',
        boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.3)',
        transition: 'all 0.2s',
      },
    };
  });
}

// Integration type colors
const INTEGRATION_TYPE_COLORS: Record<string, string> = {
  API: '#3b82f6', // blue
  'Database Sync': '#8b5cf6', // purple
  'File Transfer': '#f59e0b', // amber
  'Email Gateway': '#ec4899', // pink
  Webhook: '#10b981', // emerald
  'Data Pipeline': '#06b6d4', // cyan
  'Batch Process': '#eab308', // yellow
  'Directory Sync': '#6366f1', // indigo
};

const INTEGRATION_TYPE_STYLES: Record<string, Record<string, any>> = {
  API: { strokeDasharray: 'none', strokeWidth: 2 },
  'Database Sync': { strokeDasharray: 'none', strokeWidth: 2.5 },
  'File Transfer': { strokeDasharray: '5,5', strokeWidth: 2 },
  'Email Gateway': { strokeDasharray: '5,5', strokeWidth: 2 },
  Webhook: { strokeDasharray: '2,4', strokeWidth: 2 },
  'Data Pipeline': { strokeDasharray: 'none', strokeWidth: 3 },
  'Batch Process': { strokeDasharray: '8,4', strokeWidth: 2 },
  'Directory Sync': { strokeDasharray: 'none', strokeWidth: 2.5 },
};

// Convert integrations to React Flow edges
export function relationsToGraphEdges(apps: ApplicationNode[]): Edge[] {
  const edges: Edge[] = [];
  const edgeSet = new Set<string>();

  apps.forEach((app) => {
    if (!app.integrations) return;

    app.integrations.forEach((integration) => {
      const edgeId = `${app.id}-${integration.targetAppId}-${integration.type}`;

      // Avoid duplicate edges (important for bidirectional connections)
      if (edgeSet.has(edgeId)) return;
      edgeSet.add(edgeId);

      const color = INTEGRATION_TYPE_COLORS[integration.type] || '#3b82f6';
      const style = INTEGRATION_TYPE_STYLES[integration.type] || { strokeDasharray: 'none', strokeWidth: 2 };

      edges.push({
        id: edgeId,
        source: app.id,
        target: integration.targetAppId,
        label: integration.type,
        animated: integration.type === 'Data Pipeline',
        style: {
          stroke: color,
          ...style,
        },
        labelStyle: {
          backgroundColor: 'white',
          color: color,
          padding: '2px 6px',
          borderRadius: '4px',
          fontSize: '11px',
          fontWeight: 600,
          border: `1px solid ${color}`,
        },
        markerEnd: {
          type: 'arrowclosed' as any,
          color: color,
        },
        data: {
          description: integration.description,
          direction: integration.direction,
        },
      });
    });
  });

  return edges;
}

// Get all integration types from apps
export function getIntegrationTypes(apps: ApplicationNode[]): string[] {
  const types = new Set<string>();

  apps.forEach((app) => {
    if (app.integrations) {
      app.integrations.forEach((int) => {
        types.add(int.type);
      });
    }
  });

  return Array.from(types).sort();
}

// Get criticality levels used in data
export function getCriticalityLevels(apps: ApplicationNode[]): string[] {
  const levels = new Set<string>();

  apps.forEach((app) => {
    levels.add(app.businessCriticality);
  });

  return Array.from(levels).sort();
}
