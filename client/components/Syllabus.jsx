import React from 'react';
import Weeks from './Weeks.jsx';
import Header from './Header.jsx';
import state from './initial/state.js';

class Syllabus extends React.Component {
  constructor(props) {
    super(props);
    this.state = state;

    // aborts get if component is unmounted
    this.controller = new AbortController();
  }

  fetches() {
    const {
      servicesURL,
      syllabusPort,
      courseNumber,
      imagesPort,
      reviewsURL,
      reviewsPort,
    } = this.state;

    const options = { signal: this.controller.signal };
    fetch(`http://${servicesURL}/api/syllabus/${courseNumber}`, options)
      .then((responseData) => responseData.json())
      .then((responseJSON) => { this.setState({ syllabusData: responseJSON }); })
      .catch((err) => { if (err) { console.error('Error in GET syllabus', err); } });

    fetch(`http://${servicesURL}:${imagesPort}/api/svgs`, options)
      .then((responseData) => responseData.json())
      .then((responseJSON) => this.setState({ svgsData: responseJSON }))
      .catch((err) => { if (err) { console.error('Error in GET svgs', err); } });

    fetch(`http://${reviewsURL}:${reviewsPort}/api/totalReviewScore/${courseNumber}`, options)
      .then((responseData) => responseData.json())
      .then((responseJSON) => {
        const fiveStar = parseInt(responseJSON.fiveStarPercent.split('%')[0]);
        const fourStar = parseInt(responseJSON.fourStarPercent.split('%')[0]);
        const positiveReviews = (fiveStar + fourStar).toString().concat('%');
        const { reviewCount } = responseJSON;
        this.setState({ positiveReviews, reviewCount });
      })
      .catch((err) => { if (err) { console.error('Error in GET starReviews', err); } });
  }

  // sets initial state, then sets courseNumber from window, then fetches data
  componentDidMount() {
    const courseNumber = window.location.pathname.split('/')[1] || 1;
    this.setState({ courseNumber }, () => { this.fetches(); });
  }

  componentWillUnmount() {
    this.controller.abort();
  }

  render() {
    const {
      svgsData,
      positiveReviews,
      reviewCount,
      syllabusData,
    } = this.state;

    return (
      <div className="syllabus">
        <Header svgsData={svgsData} positiveReviews={positiveReviews} reviewCount={reviewCount} />
        <Weeks svgsData={svgsData} syllabusData={syllabusData} />
      </div>
    );
  }
}

export default Syllabus;
