import { Box } from '@mui/material';
import React, { useCallback, useState } from 'react';
/**
 * this component add the placeholder for dropping the text
 */
const DropCard = ({ onDrop, index }) => {
  const [displayDropCard, setDisplayDropCard] = useState(false);

  /**
   * whenever user enter task in placeholder then show the placeholder
   */
  const onDragEnter = useCallback(() => {
    setDisplayDropCard(true);
  }, []);

  /**
   * prevent default
   */
  const handleDragOver = useCallback((e) => {
    e.preventDefault();
  }, []);

  /**
   * whenver user move the task out of placeholder then don't show the placeholder
   */
  const onDragLeave = useCallback(() => {
    setDisplayDropCard(false);
  }, []);

  /**
   * on Drop set display also remove the placeholder and call the on drop function
   */
  const handleDrop = useCallback(() => {
    setDisplayDropCard(false);
    onDrop();
  }, [setDisplayDropCard, onDrop]);

  return (
    <Box
      onDragEnter={onDragEnter}
      onDragLeave={onDragLeave}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      sx={{
        minHeight: '1rem',
        width: '100%',
        opacity: displayDropCard ? 1 : 0,
        border: '.1rem',
        borderStyle: 'dashed',
        transition: 'opacity .3s ease, padding .3s ease',
        padding: displayDropCard ? '2rem 0' : '0',
        borderRadius: '.4rem',
        borderColor: 'rgb(166, 159, 243)',
      }}
    />
  );
};

export default DropCard;
