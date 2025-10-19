import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  getAlbums,
  createAlbum,
  updateAlbum,
  deleteAlbum,
  CreateAlbumRequest,
  UpdateAlbumRequest,
} from '../../api/album-purchase/albums';

// 앨범 목록 조회
export function useGetAlbums() {
  return useQuery({
    queryKey: ['album-purchase', 'albums'],
    queryFn: () => getAlbums(),
  });
}

// 앨범 등록
export function useCreateAlbum() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (requestData: CreateAlbumRequest) => createAlbum(requestData),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['album-purchase', 'albums'],
      });
    },
  });
}

// 앨범 수정
export function useUpdateAlbum() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (requestData: UpdateAlbumRequest) => updateAlbum(requestData),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['album-purchase', 'albums'],
      });
    },
  });
}

// 앨범 삭제
export function useDeleteAlbum() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (albumId: number) => deleteAlbum(albumId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['album-purchase', 'albums'],
      });
    },
  });
}
