import React, { Component } from 'react';
import {
  Dialog,
  Typography,
} from '@material-ui/core';
import { observe } from 'mobx';

const styles = {}

const SimpleModal = observe(() => {
  <Dialog></Dialog>
});