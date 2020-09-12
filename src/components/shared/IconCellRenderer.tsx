import React, { Component } from 'react';
import { ICellRendererParams } from 'ag-grid-community';
// import Grid from '@material-ui/core/Grid';
import FolderOpenTwoToneIcon from '@material-ui/icons/FolderOpenTwoTone';
import StarsOutlinedIcon from '@material-ui/icons/StarsOutlined';

interface IProps extends ICellRendererParams {
  // tslint:disable-next-line: no-any
  classes: any;
  // tslint:disable-next-line: no-any
  props: any;
  onExecute: (rowId: number) => void;
  // tslint:disable-next-line: no-any
  parentRef?: any;
}

// https://en.morzel.net/post/ag-grid-react-cell-renderers-performance
// Using a class for better render performance

export class IconCellRenderer extends Component<IProps> {
  constructor(props: IProps) {
    super(props);
    this.invokeParentMethod = this.invokeParentMethod.bind(this);
  }

  invokeParentMethod() {
    this.props.context.componentParent.methodFromParent(this.props.rowIndex);
  }

  render() {
    return (
      <>
        <span style={{ padding: '5px' }}>
          {this.props.data.isSection ? (
            <FolderOpenTwoToneIcon />
          ) : (
            <StarsOutlinedIcon />
          )}
        </span>
        {this.props.data.name}
      </>
    );
  }
}
