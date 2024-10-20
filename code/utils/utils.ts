/**
 * Fungsi untuk mendapatkan URL gambar dari movie
 * @param movieId - ID dari movie
 * @returns URL dari gambar movie
 */
export const getMovieImageUrl = (movieId: string): string => {
  return `https://api.themoviedb.org/3/movie/${movieId}/images`;
}

/**
 * Fungsi untuk mengubah format tanggal
 * @param date - Tanggal dalam format 'YYYY-MM-DD'
 * @returns Tanggal dalam format 'MMM DD, YYYY'
 */
export const formatDate = (date: string): string => {
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };
  const newDate = new Date(date);
  return newDate.toLocaleDateString('en-US', options);
}

export const encrypt = (data: string): string => {
  return Buffer.from(data).toString('base64');
}

export const decrypt = (encryptedData: string): string => {
  return Buffer.from(encryptedData, 'base64').toString('utf-8');
}
