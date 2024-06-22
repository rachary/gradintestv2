export const formatName = ( email: string ): string => {

  return email.split('@')[0].replace(/[_\-.]/g, ' ')
};