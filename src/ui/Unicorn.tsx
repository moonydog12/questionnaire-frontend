import { Box } from '@mui/material';

function Unicorn() {
  return (
    <>
      <Box
        sx={{
          position: 'absolute',
          top: '5rem',
          left: 0,
          zIndex: -1,
        }}
      >
        <img src="/src/assets/unicorn-left.png" alt="Unicorn" style={{ width: '25rem' }} />
      </Box>
      <Box
        sx={{
          position: 'absolute',
          top: '5rem',
          right: 0,
          transform: 'rotateY(180deg)',
          zIndex: -1,
        }}
      >
        <img src="/src/assets/unicorn-left.png" alt="Unicorn" style={{ width: '25rem' }} />
      </Box>
    </>
  );
}

export default Unicorn;
