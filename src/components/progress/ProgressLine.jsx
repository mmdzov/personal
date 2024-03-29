import React, { useEffect, useState } from 'react';
import './ProgressLine.css';

const ProgressLine = ({
  label,
  backgroundColor = '#e5e5e5',
  visualParts = [
    {
      percentage: '0%',
      color: 'white',
    },
  ],
  labelStyle,
}) => {
  const [widths, setWidths] = useState(
    visualParts.map(() => {
      return 0;
    }),
  );

  useEffect(() => {
    requestAnimationFrame(() => {
      setWidths(
        visualParts.map((item) => {
          return item.percentage;
        }),
      );
    });
  }, [visualParts]);

  useEffect(() => {
    return () => {
      setWidths(
        visualParts.map(() => {
          return 0;
        }),
      );
    };
  }, []);

  return (
    <>
      <div className="progressLabel" style={labelStyle}>
        {label}
      </div>
      <div
        className="progressVisualFull"
        style={{
          backgroundColor,
        }}
      >
        {visualParts.map((item, index) => {
          return (
            <div
              key={index}
              style={{
                width: widths[index],
                backgroundColor: item.color,
              }}
              className="progressVisualPart"
            />
          );
        })}
      </div>
    </>
  );
};

export default ProgressLine;
