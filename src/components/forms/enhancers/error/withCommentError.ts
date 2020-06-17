import { withProps } from 'recompose';
import { MakeOrderFormProps, TextField } from '../../models';

const getCommentError = (
  comment: TextField
): string => {
  if (!comment.isDirty) {
    return '';
  }

  return (comment.value.length < 255) ? '' : 'Должно содержать не более 255 символов';
};

export const withCommentError = withProps((ownerProps: Partial<MakeOrderFormProps>) => ({
  commentError: getCommentError(
    ownerProps.comment
  )
}));
