import React from 'react';


interface Props {
  // tslint:disable-next-line: no-any
  section: any;
}

export default class extends React.Component<Props> {
  // tslint:disable-next-line: no-any
  static async getInitialProps(ctx: any) {
    // tslint:disable-next-line: no-console
    console.log(ctx.query.section);
    return { };
  }

  render() {
    return (
      <div>
        <p>Sections</p>
      </div>
    );
  }
}
