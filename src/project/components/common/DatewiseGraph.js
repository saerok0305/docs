import React, { useCallback, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { ForceGraph2D } from 'react-force-graph';
import defaultStyle from '../../../style';
import useAsync from '../../../hooks/useAsync';
import retrieveDatewise from '../../../api/DatewisePagerankApi';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const Top = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
  height: 60px;
`;

const Bottom = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: calc(100% - 60px);
`;

const MethodButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 100px;
  height: 30px;

  border-radius: 4px;

  background: ${defaultStyle.color1};

  font-size: 0.8rem;

  margin-right: 10px;
  /* margin-bottom: 10px; */
  color: white;

  &:hover {
    cursor: pointer;
    opacity: 0.5;
  }
`;

const NODE_R = 8;

const DatewiseGraph = React.memo(function DatewiseGraph({
  datewiseAggState,
  handleNodeClick,
  datewiseState,
  setDatewiseState,
  pointedDate,
}) {
  const ref = useRef();
  const [section, setSection] = useState({ width: 0, height: 0 });
  useEffect(() => {
    setSection({
      width: ref.current.clientWidth,
      height: ref.current.clientHeight,
    });
  }, [
    datewiseAggState,
    handleNodeClick,
    datewiseState,
    setDatewiseState,
    pointedDate,
  ]);

  // graph payload (with minimalist structure)
  // --------------------------------------------------

  const [data, setData] = useState({ nodes: [], links: [] });
  useEffect(() => {
    if (datewiseAggState) {
      const dates = new Set();
      const links = [];
      for (let timeLink of Object.keys(datewiseAggState)) {
        // console.log(timeLink); /////////////////////////
        const col = timeLink.split('_');
        const value = datewiseAggState[timeLink];
        dates.add(col[0]);
        dates.add(col[1]);
        const obj = {
          source: col[0],
          target: col[1],
          color: value > 10 ? 'red' : 'grey',
          count: value,
        };
        links.push(obj);
      }

      const nodes = [];
      for (let e of dates) {
        nodes.push({ id: e, name: e, val: 5 });
      }
      setData({ nodes: nodes, links: links });
    }
    setDatewiseState(null);
  }, [datewiseAggState]);

  // api - news
  const [datewiseResponse, refetchDatewise] = useAsync(
    () =>
      retrieveDatewise({
        inputState: datewiseAggState,
        setOutputState: setDatewiseState,
      }),
    [],
  );
  // const [datewiseState, setDatewiseState] = useState(null); ///////////////

  const onDatewise = () => {
    refetchDatewise();
  };

  // *************************************************************************************************************************
  useEffect(() => {
    // console.log(pointedDate); ////////////////////////
    if (datewiseState) {
      const dateValue = new Map();
      const dateRank = new Map();
      for (let e of datewiseState) {
        dateValue.set(e.node, e.salience);
        dateRank.set(e.node, e.rank);
      }
      const transform = (data) => {
        for (let node of data.nodes) {
          // node.val = dateValue.get(node.name);
          node.val = dateRank.get(node.name) < 50 ? 10 : 2;
          node['color'] = dateRank.get(node.name) < 50 ? 'red' : 'grey';
          node['val'] = 5;
          if (pointedDate && pointedDate === node.name) {
            node['val'] = 30;
            node['color'] = defaultStyle.color1;
          }
          // else {
          //     node['val'] = 5;
          // }
        }
        // for (let link of data.links) {
        //     // link.width = 10;
        // }
        return data;
      };
      const updatedData = transform(data); // 객체 내용을 직접 변경, 객체 참조만 바꾸어야함

      setData(updatedData);
    }
  }, [datewiseState, pointedDate]);
  // *************************************************************************************************************************

  const [highlightNodes, setHighlightNodes] = useState(new Set());
  const [highlightLinks, setHighlightLinks] = useState(new Set());
  const [hoverNode, setHoverNode] = useState(null);

  const updateHighlight = () => {
    setHighlightNodes(highlightNodes);
    setHighlightLinks(highlightLinks);
  };

  const handleNodeHover = (node) => {
    // highlightNodes.clear();
    // highlightLinks.clear();
    // if (node) {
    //     highlightNodes.add(node);
    //     // node.neighbors.forEach((neighbor) => highlightNodes.add(neighbor));
    //     // node.links.forEach((link) => highlightLinks.add(link));
    // }
    // setHoverNode(node || null);
    // updateHighlight();
  };

  const handleLinkHover = (link) => {
    highlightNodes.clear();
    highlightLinks.clear();

    if (link) {
      highlightLinks.add(link);
      highlightNodes.add(link.source);
      highlightNodes.add(link.target);
    }

    updateHighlight();
  };

  const paintRing = useCallback(
    (node, ctx) => {
      // add ring just for highlighted nodes
      ctx.beginPath();
      ctx.arc(node.x, node.y, NODE_R * 1.4, 0, 2 * Math.PI, false);
      ctx.fillStyle = node === hoverNode ? 'red' : 'orange';
      ctx.fill();
    },
    [hoverNode],
  );

  const paintLink = useCallback((link, ctx, scale) => {
    ctx.beginPath();
    ctx.moveTo(link.source.x, link.source.y);
    ctx.lineTo(link.target.x, link.target.y);
    ctx.strokeStyle = 'orange';
    // ctx.lineWidth = link.count;
    ctx.closePath();
    ctx.stroke();
  });

  const [isHovered, setIsHovered] = useState(false);

  const fgRef = useRef();

  useEffect(() => {
    fgRef.current.d3Force('charge').distanceMax(100); // calibrate this value to your case
  }, []);

  return (
    <Container>
      <Top>
        <MethodButtonContainer onClick={onDatewise}>
          PageRank
        </MethodButtonContainer>
      </Top>
      <Bottom ref={ref}>
        <ForceGraph2D
          ref={fgRef}
          width={section.width}
          height={section.height}
          cooldownTicks={100}
          // onEngineStop={() => fgRef.current.zoomToFit(400)}
          graphData={data}
          linkDirectionalArrowLength={5.5}
          // linkDirectionalArrowRelPos={1}
          // linkDirectionalParticles={0}
          // nodeLabel={(node) =>
          //     `<div><b>${node.label}</b>: <span>${node.value}</span></div>`
          // }
          linkLabel={(link) =>
            `<div><span>${link.source.name} > ${link.target.name} (${link.count})</span></div>`
          }
          // nodeRelSize={NODE_R}
          // autoPauseRedraw={false}
          // linkWidth={(link) => (highlightLinks.has(link) ? 5 : 1)}
          // linkDirectionalParticles={4}
          // linkDirectionalParticleWidth={(link) =>
          //     highlightLinks.has(link) ? 4 : 0
          // }
          // nodeCanvasObjectMode={(node) =>
          //     highlightNodes.has(node) ? 'before' : undefined
          // }
          // nodeCanvasObject={paintRing}
          onNodeHover={handleNodeHover}
          // onLinkHover={handleLinkHover}

          linkCanvasObject={paintLink}
          onNodeClick={handleNodeClick}
          // onNodeHover={(node) => {
          //     if (node != null) {
          //         //tried fRef.current.pauseAnimation(); here, but it didn't change anything
          //         setIsHovered(true);
          //     } else {
          //         setIsHovered(false);
          //     }
          // }}
          // cooldownTicks={isHovered ? 0 : Infinity} //when this is active, the graph "shrinks" on hover and all link lengths shorten
          onNodeDragEnd={(node) => {
            node.fx = node.x;
            node.fy = node.y;
            node.fz = node.z;
          }}
          // onNodeDrag={(node) => {
          //     node.fx = node.x;
          //     node.fy = node.y;
          //     node.fz = node.z;
          // }}
        />
      </Bottom>
    </Container>
  );
});

export default React.memo(DatewiseGraph);
