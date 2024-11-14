import { Box, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <>
      <Box sx={{ textAlign: 'center', mt: 7 }}>
        <Typography variant="h3" color="secondary" gutterBottom>
          Page Not Found
        </Typography>
        <Typography variant="h4" sx={{ mb: 2 }}>
          此頁面不存在
        </Typography>

        <Button variant="contained" color="secondary" component={Link} to="/">
          Go Home
        </Button>
      </Box>
      <Box sx={{ textAlign: 'center', mt: -6 }}>
        <img src="/src/assets/red_dragon.png" alt="red dragon" style={{ width: '35rem' }} />
      </Box>
    </>
  );
}
