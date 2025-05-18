import { useUpodateDcRate } from '@/query/query/dc';
import React, { useEffect } from 'react';
import { Stack, TextField, Button, Box } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';

export default function UpdateDcRate({ info }: { info: any }) {
  const { mutateAsync, isPending } = useUpodateDcRate();

  const [selectedNickname, setSelectedNickname] = React.useState<number>(
    info.getValue(),
  );

  useEffect(() => {
    if (info) {
      setSelectedNickname(info.getValue());
    }
  }, [info]);

  if (!info) {
    return null;
  }

  return (
    <Stack direction="row" spacing={1} alignItems="center">
      <TextField
        type="number"
        size="small"
        value={selectedNickname}
        onChange={(e) => setSelectedNickname(Number(e.target.value))}
        InputProps={{
          endAdornment: <Box component="span">%</Box>,
        }}
        sx={{ width: 100 }}
      />
      <Button
        variant="contained"
        size="small"
        startIcon={<SaveIcon />}
        onClick={async () =>
          selectedNickname === null
            ? alert('할인율을 작성해 주세요')
            : await mutateAsync({
                id: info.row.original.id,
                dcRate: selectedNickname,
              })
        }
        disabled={isPending}
        sx={{ width: 140 }}
      >
        {isPending ? '변경중...' : '할인율 변경'}
      </Button>
    </Stack>
  );
}
