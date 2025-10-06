import React, { useEffect, useRef } from 'react';

interface Dot {
  x: number;
  y: number;
  id: number;
}

const SimpleNeuralNetwork: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const dots: Dot[] = [];
    const lines: HTMLDivElement[] = [];

    console.log('Neural Network: Starting initialization...');

    // Create proper neural network layers
    const createDots = () => {
      const layers = 4; // Input, Hidden1, Hidden2, Output
      const nodesPerLayer = [8, 12, 8, 4]; // Different number of nodes per layer
      const layerSpacing = window.innerWidth / (layers + 1);
      const margin = 100;
      
      let nodeId = 0;
      
      for (let layer = 0; layer < layers; layer++) {
        const nodesInLayer = nodesPerLayer[layer];
        const layerHeight = window.innerHeight - 2 * margin;
        const nodeSpacing = layerHeight / (nodesInLayer + 1);
        
        for (let node = 0; node < nodesInLayer; node++) {
          const dot: Dot = {
            id: nodeId,
            x: layerSpacing * (layer + 1),
            y: margin + nodeSpacing * (node + 1)
          };
          dots.push(dot);
          nodeId++;
        }
      }
    };

    // Create proper neural network connections between layers
    const createLines = () => {
      // Clear existing lines
      lines.forEach(line => line.remove());
      lines.length = 0;

      const connections: Array<{from: Dot, to: Dot, distance: number, element: HTMLDivElement}> = [];
      const layers = 4;
      const nodesPerLayer = [8, 12, 8, 4];
      
      let nodeId = 0;
      const layerNodes: Dot[][] = [];
      
      // Group nodes by layer
      for (let layer = 0; layer < layers; layer++) {
        const nodesInLayer = nodesPerLayer[layer];
        const layerNodeList: Dot[] = [];
        for (let node = 0; node < nodesInLayer; node++) {
          layerNodeList.push(dots[nodeId]);
          nodeId++;
        }
        layerNodes.push(layerNodeList);
      }
      
      // Connect each layer to the next layer (feedforward)
      for (let layer = 0; layer < layers - 1; layer++) {
        const currentLayer = layerNodes[layer];
        const nextLayer = layerNodes[layer + 1];
        
        currentLayer.forEach((fromNode) => {
          nextLayer.forEach((toNode) => {
            const lineElement = document.createElement('div');
            lineElement.className = 'neural-line';
            lineElement.style.position = 'absolute';
            lineElement.style.height = '2px';
            lineElement.style.background = 'linear-gradient(90deg, transparent, #8b5cf6, #a855f7, #c084fc, transparent)';
            lineElement.style.transformOrigin = 'left center';
            lineElement.style.zIndex = '-1';
            lineElement.style.opacity = '0.08';
            lineElement.style.boxShadow = '0 0 5px #8b5cf6, 0 0 10px rgba(139, 92, 246, 0.15)';
            lineElement.style.borderRadius = '1px';
            lineElement.style.pointerEvents = 'none';
            
            const dx = toNode.x - fromNode.x;
            const dy = toNode.y - fromNode.y;
            const length = Math.sqrt(dx * dx + dy * dy);
            const angle = Math.atan2(dy, dx) * 180 / Math.PI;
            
            lineElement.style.left = `${fromNode.x}px`;
            lineElement.style.top = `${fromNode.y}px`;
            lineElement.style.width = '0px';
            lineElement.style.transform = `rotate(${angle}deg)`;
            
            container.appendChild(lineElement);
            lines.push(lineElement);
            
            connections.push({
              from: fromNode,
              to: toNode,
              distance: length,
              element: lineElement
            });
          });
        });
      }

      const getConnection = (fromId: number, toId: number) =>
        connections.find(c => c.from.id === fromId && c.to.id === toId);

      const drawLine = (conn: { distance: number; element: HTMLDivElement }, duration = 800, highlight = false) =>
        new Promise<void>((resolve) => {
          const start = Date.now();
          if (highlight) {
            conn.element.style.background = 'linear-gradient(90deg, #a855f7, #c084fc, #f0abfc)';
            conn.element.style.opacity = '0.9';
            conn.element.style.boxShadow = '0 0 8px #a855f7, 0 0 16px rgba(168, 85, 247, 0.6)';
          } else {
            conn.element.style.opacity = '0.35';
          }
          const tick = () => {
            const p = Math.min((Date.now() - start) / duration, 1);
            conn.element.style.width = `${conn.distance * p}px`;
            if (p < 1) requestAnimationFrame(tick);
            else resolve();
          };
          tick();
        });

      // Sequential fan-out and selection from each input node through layers
      const animateFromInput = async (inputIndex: number) => {
        let current = layerNodes[0][inputIndex];
        for (let layer = 0; layer < layers - 1; layer++) {
          const nextLayer = layerNodes[layer + 1];
          const conns = nextLayer
            .map(to => getConnection(current.id, to.id))
            .filter(Boolean) as Array<{ distance: number; element: HTMLDivElement }>;

          // fan-out: draw all lines from current to next layer
          await Promise.all(conns.map((c, i) => drawLine(c, 600 + i * 50, false)));

          // select one in the next layer
          const selectedIdx = Math.floor(nextLayer.length / 2 + (Math.random() * 2 - 1) * (nextLayer.length / 4));
          const selected = nextLayer[Math.max(0, Math.min(nextLayer.length - 1, selectedIdx))];
          const selectedConn = getConnection(current.id, selected.id);
          if (selectedConn) {
            await drawLine(selectedConn, 500, true);
          }
          current = selected;
        }
      };

      const resetLines = () => {
        connections.forEach(conn => {
          conn.element.style.width = '0px';
          conn.element.style.opacity = '0.08';
          conn.element.style.background = 'linear-gradient(90deg, transparent, #8b5cf6, #a855f7, #c084fc, transparent)';
          conn.element.style.boxShadow = '0 0 5px #8b5cf6, 0 0 10px rgba(139, 92, 246, 0.15)';
        });
      };

      const animateAllInputs = async () => {
        for (let i = 0; i < layerNodes[0].length; i++) {
          await animateFromInput(i);
          await new Promise(r => setTimeout(r, 500));
          resetLines();
          await new Promise(r => setTimeout(r, 300));
        }
        // loop
        setTimeout(() => animateAllInputs(), 800);
      };

      setTimeout(() => {
        animateAllInputs();
      }, 1200);
    };

    // Create DOM elements with JavaScript controlled animation
    const createElements = () => {
      // Clear existing elements
      container.innerHTML = '';
      console.log('Neural Network: Creating', dots.length, 'dots...');

      // Create dots first with JavaScript animation
      dots.forEach((dot, index) => {
        const dotElement = document.createElement('div');
        dotElement.className = 'neural-dot';
        dotElement.style.left = `${dot.x}px`;
        dotElement.style.top = `${dot.y}px`;
        dotElement.style.opacity = '0';
        dotElement.style.transform = 'scale(0)';
        container.appendChild(dotElement);
        console.log('Neural Network: Created dot', index, 'at', dot.x, dot.y);
        
        // JavaScript controlled dot appearance - faster
        setTimeout(() => {
          const startTime = Date.now();
          const duration = 1000; // 1 second to appear (faster)
          
          const animateDot = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            dotElement.style.opacity = `${progress}`;
            dotElement.style.transform = `scale(${progress})`;
            
            if (progress < 1) {
              requestAnimationFrame(animateDot);
            }
          };
          
          animateDot();
        }, index * 100); // Each dot starts 100ms after previous (faster)
      });

      // Create lines after all dots appear
      setTimeout(() => {
        createLines();
      }, dots.length * 100 + 1000); // Wait for all dots + 1 second
    };

    // Disable the old free-form animation for clarity of the new path animation
    const animate = () => {};

    // Initialize
    console.log('Neural Network: Initializing...');
    createDots();
    console.log('Neural Network: Created', dots.length, 'dots');
    createElements();
    animate();
    console.log('Neural Network: Animation started');

    // Handle resize
    const handleResize = () => {
      dots.length = 0;
      createDots();
      createElements();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return <div ref={containerRef} className="neural-dots" />;
};

export default SimpleNeuralNetwork;
