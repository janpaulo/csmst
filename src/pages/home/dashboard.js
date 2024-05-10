import React from 'react';

import { Container } from '@mui/material';

class dashboard extends React.Component {
  constructor() {
    super();
    this.state = {
      items: [

      ],
    };
    // function name(params) {
    //   ''
    // }
  }
  render() {
    return (
      <>
        <Container maxWidth="lg">
            I. Overview
            The Philippine Health Insurance Corporation (PhilHealth) is a Government-Owned and
            Controlled Corporation (GOCC) created through Republic Act 7875, as amended, otherwise
            known as the National Health Insurance Act of 2013.
            PhilHealth, as the administrator of the National Health Insurance Program (NHIP), provides
            health insurance coverage and ensures affordable, acceptable, available and accessible health
            care services for all citizens of the Philippines. It shall serve as the means for the healthy to
            help pay for the care of the sick and for those who can afford medical care to subsidize those
            who cannot.
            As one of the implementing agency of the Republic Act 11032 otherwise known as the Ease
            Doing Business and Efficient Government Service Delivery Act of 2018, PhilHealth shall
            adopt and implement the harmonized Client Satisfaction Measurement Survey Mechanism
            pursuant to RA 11032’s IRR and ARTA-MC 2022-05 streamlined with the Governance
            Commission for GOCCs (GCG)’s Performance Evaluation System (PES) for the GOCC
            Sector’s Client Satisfaction Survey (CSS) Requirement pursuant to the ARTA-GCG Joint
            Memorandum Circular No. 1, s. 2023.
            In compliance to the policy, PhilHealth’s Committee on Anti-Red Tape issued Corporate
            Order No. 2023-0010: “Client Satisfaction Measurement (CSM) Mechanism for Internal
            and External Services Prescribed by Anti-Red Tape Authority (ARTA)”.
        </Container>
      </>
    )
  }

}


export default dashboard;