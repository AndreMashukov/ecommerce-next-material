import React from 'react';
import MaskedInput from 'react-text-mask';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import { MakeOrderFormProps } from '../models/MakeOrderForm';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '& > *': {
        margin: theme.spacing(1)
      }
    },
    error: {
      fontSize: 'smaller',
      color: theme.palette.error.main
    }
  })
);

interface TextMaskCustomProps {
  inputRef: (ref: HTMLInputElement | null) => void;
}

function TextMaskCustom(props: TextMaskCustomProps) {
  const { inputRef, ...other } = props;

  return (
    <MaskedInput
      {...other}
      // tslint:disable-next-line: no-any
      ref={(ref: any) => {
        inputRef(ref ? ref.inputElement : null);
      }}
      mask={[
        '8',
        ' ',
        '(',
        /\d/,
        /\d/,
        /\d/,
        ')',
        ' ',
        /\d/,
        /\d/,
        /\d/,
        '-',
        /\d/,
        /\d/,
        '-',
        /\d/,
        /\d/
      ]}
      placeholderChar={'\u2000'}
      showMask
    />
  );
}

interface State {
  textmask: string;
}

function FormattedPhone(props: Partial<MakeOrderFormProps>) {
  const {
    phone,
    phoneError,
    onPhoneChange
  } = props;
  const classes = useStyles();
  const [values, setValues] = React.useState<State>({
    textmask: '8 (   )    -  -  '
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });

    onPhoneChange(event);
    phone.value = event.target.value;
  };

  return (
    <div className={classes.root}>
      <FormControl error={phoneError ? true : false}>
        <InputLabel htmlFor="formatted-text-mask-input">
          Контактный телефон
        </InputLabel>
        <Input
          placeholder="Контактный телефон"
          value={values.textmask}
          onChange={handleChange}
          error={phoneError ? true : false}
          name="textmask"
          id="formatted-text-mask-input"
          // tslint:disable-next-line: no-any
          inputComponent={TextMaskCustom as any}
        />
        {phoneError && (<div className={classes.error}>{phoneError}</div>)}
      </FormControl>
    </div>
  );
}

export default FormattedPhone;
