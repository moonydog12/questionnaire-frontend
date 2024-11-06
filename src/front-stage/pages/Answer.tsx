import { Paper, Typography } from '@mui/material';

function Answer() {
  return (
    <Paper sx={{ p: 2 }}>
      <Typography variant="h3" textAlign={'center'} sx={{ mb: 2 }}>
        這裡會放問卷題目
      </Typography>
      <Typography variant="body1" gutterBottom>
        這裡會放問卷說明 Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ab assumenda
        voluptates nihil commodi similique repudiandae incidunt. Nihil deleniti nam iusto obcaecati
        quis neque quam. Necessitatibus voluptate, blanditiis laudantium ipsam aliquid ducimus iure
        ipsum perferendis, nemo vel maiores, alias adipisci fugiat doloribus accusamus iste
        provident in ut repudiandae explicabo laboriosam mollitia? Quidem dolor quibusdam vero
        aspernatur delectus? Molestiae repellendus ullam expedita dolores accusantium eveniet quasi
        nemo voluptate repellat doloribus placeat ut debitis minima perferendis architecto, aut
        perspiciatis possimus voluptatibus magni consectetur provident. Nostrum iste expedita rerum
        doloremque magni, facilis praesentium ad consequuntur, repellat, quam consequatur pariatur
        officiis et eveniet earum soluta?
      </Typography>
    </Paper>
  );
}

export default Answer;
