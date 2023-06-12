import React from 'react';
import PropTypes from 'prop-types';
import { Controller } from 'react-hook-form';
import { TextInput, HelperText } from 'react-native-paper';

const ControlTextField = ({ control, name, label, isRequired, maxLength, helperText, error }) => {
  const rules = { required: isRequired };
  if (maxLength) {
    rules.maxLength = maxLength;
  }

  const isTextarea = maxLength > 1000;

  let errorText = '';
  if (error?.type === 'required') {
    errorText = 'This is field is required.';
  } else if (error?.type === 'maxLength') {
    errorText = `Maximum length is ${maxLength} symbols.`;
  }

  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({ field: { onChange, onBlur, value } }) => (
        <>
          <TextInput
            value={value}
            onBlur={onBlur}
            onChangeText={onChange}
            mode="outlined"
            label={label}
            error={Boolean(error)}
            maxLength={maxLength}
            multiline={isTextarea}
            numberOfLines={4}
            style={{ maxHeight: 120, marginTop: 10, textAlign: 'auto' }}
          />
          {(helperText || errorText) && (
            <HelperText type={errorText ? 'error' : 'info'}>
              {errorText ? errorText : helperText}
            </HelperText>
          )}
        </>
      )}
    />
  );
};

export default ControlTextField;

ControlTextField.propTypes = {
  control: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  isRequired: PropTypes.bool,
  maxLength: PropTypes.number,
  helperText: PropTypes.string,
  error: PropTypes.object,
};

ControlTextField.defaultProps = {
  label: '',
  helperText: '',
  error: null,
};
