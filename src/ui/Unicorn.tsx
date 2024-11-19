import { Box, SxProps, Theme } from '@mui/material';

interface UnicornProps {
  imgSrc: string;
  sx?: SxProps<Theme>;
}

export default function Unicorn({ imgSrc, sx }: UnicornProps) {
  return (
    <Box
      sx={{
        ...sx,
      }}
    >
      <img src={imgSrc} alt="Unicorn" style={{ width: '25rem' }} />
    </Box>
  );
}
