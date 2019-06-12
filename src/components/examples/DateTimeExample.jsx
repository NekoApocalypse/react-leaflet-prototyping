import React, { useState, useEffect } from 'react';
import DateFnsUtils from '@date-io/date-fns';
import cnLocale from 'date-fns/locale/zh-CN';
import {
  Button, Grid, Typography, TextField,
} from '@material-ui/core';
import { Formik, Form, Field } from 'formik';
import {
  KeyboardDateTimePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';

const DateTimePickerField = ({ field, form, ...other }) => {
  const currentError = form.errors[field.name];
  return (
    <KeyboardDateTimePicker
      name={field.name}
      value={field.value}
      error={Boolean(currentError)}
      onError={(_, error) => form.setFieldError(field.name, error)}
      onChange={date => form.setFieldValue(field.name, date, true)}
      helperText={currentError}
      variant="inline"
      format="yyyy/MM/dd HH:mm"
      ampm={false}
      disableFuture
      {...other}
    />
  );
};

const TextFieldField = ({ field, form, ...other }) => {
  const currentError = form.errors[field.name];
  return (
    <TextField
      value={field.value}
      error={Boolean(currentError)}
      onChange={value => form.setFieldValue(field.name, value, true)}
      helperText={currentError}
      {...other}
    />
  );
};

const DateTimeExample = () => {
  const [selectedDate, handleDateChange] = useState(new Date());
  const [beginDate, setBeginDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  useEffect(() => {
    const date = new Date();
    setEndDate(date);
    date.setDate(date.getDate() - 1);
    setBeginDate(date);
  }, []);

  return (
    <MuiPickersUtilsProvider
      utils={DateFnsUtils}
      locale={cnLocale}
    >
      <Formik
        onSubmit={console.log}
        initialValues={{
          beginTime: beginDate,
          endTime: endDate,
          mmsi: '',
          shipname: '',
        }}
        enableReinitialize
        validate={(values) => {
          const errors = {};
          if (values.beginTime >= values.endTime) {
            errors.beginTime = '开始时间必须早于结束时间';
            errors.endTime = '开始时间必须早于结束时间';
          }
          if (!values.beginTime) {
            errors.beginTime = '时间能为空';
          }
          if (!values.endTime) {
            errors.endTime = '时间能为空';
          }
          return errors;
        }}
      >
        {({ values, errors }) => (
          <Form>
            <Grid container>
              <Grid item container justify="center" xs={12}>
                <Typography>{beginDate ? beginDate.toISOString() : 'null'}</Typography>
                <Typography>{endDate ? endDate.toISOString() : 'null'}</Typography>
              </Grid>
              <Grid item container justify="center" xs={12}>
                <Field name="beginTime" component={DateTimePickerField} label="开始时间" />
                <Field name="endTime" component={DateTimePickerField} label="结束时间" />
              </Grid>
              <Grid item container justify="center" xs={12}>
                <Field
                  name="mmsis"
                  component={TextFieldField}
                  label="MMSI"
                />
              </Grid>
              <Grid item container justify="center" xs={12}>
                <Field
                  name="shipname"
                  component={TextFieldField}
                  label="舰船名称"
                />
              </Grid>
              <Grid item container justify="center" xs={12}>
                <Button variant="contained" type="submit">Submit</Button>
              </Grid>
              <Grid item xs={12} style={{ margin: '24px' }}>
                <Typography>
                  {JSON.stringify({ errors, values }, null, 2)}
                </Typography>
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>
      <KeyboardDateTimePicker
        variant="inline"
        label="选择日期"
        value={selectedDate}
        onChange={handleDateChange}
        format="dd/MM/yyyy HH:mm"
        ampm={false}
        // inputVariant="outlined"
        disableFuture
      />
    </MuiPickersUtilsProvider>
  );
};

export default DateTimeExample;
