import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Button from '../Button/Button';
import { fetchQuizzes } from '../../actions/quizActionCreator';
import './Quiz.css';

class Quiz extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentIndex : 0,
      numberOfCorrects : 0
    };
  }

  componentDidMount() {
    this.restart();
  }

  restart() {
    this.setState({
      currentIndex : 0,
      numberOfCorrects : 0
    });
    this.props.fetchQuizzes();
  }

  selectAnswer(quiz, answer) {
    let { currentIndex, numberOfCorrects } = this.state;
    const isCorrect = quiz.judgeCorrectAnswer(answer);

    if (isCorrect) {
      numberOfCorrects++;
      alert('Correct answer!!');
    } else {
      alert(`Wrong answer... (The correct answer is "${quiz.correctAnswer}"`);
    }
    currentIndex++;

    this.setState({
      currentIndex,
      numberOfCorrects
    });
  }

  render() {
    const { quizzes } = this.props.quizInfo;
    const { currentIndex } = this.state;

    // 読み込み中
    if (quizzes.length === 0) {
      return this.renderLoading();
    }

    // クイズ中
    if (quizzes.length > 0 && currentIndex < quizzes.length) {
      return this.renderQuiz();
    }

    // クイズ結果
    if (quizzes.length > 0 && currentIndex >= quizzes.length) {
      return this.renderResult();
    }
  }

  renderLoading() {
    return (
      <div>
        <h1>クイズページ</h1>
        <p>Now Loading...</p>
        <hr/>
        <Link to="/">トップページへ</Link>
      </div>
    );
  }

  renderQuiz() {
    const { quizzes } = this.props.quizInfo;
    const { currentIndex } = this.state;

    const quiz = quizzes[currentIndex];
    const answers = quiz.shuffleAnswers().map((answer, index) => {
      return (
        <li key={index}>
          <Button onClickHandler={() => { this.selectAnswer(quiz, answer) }}>
            {answer}
          </Button>
        </li>
      );
    });

    return (
      <div>
        <h1>クイズページ</h1>
        <div>
          <p>{quiz.question}</p>
          <ul className="QuizList">{answers}</ul>
        </div>
        <Link to="/">トップページへ</Link>
      </div>
    );
  }

  renderResult() {
    const { quizzes } = this.props.quizInfo;
    const { numberOfCorrects } = this.state;

    return (
      <div>
        <h1>クイズページ</h1>
        <div>
          <p id="result">{`${numberOfCorrects}/${quizzes.length} corrects.`}</p>
          <Button onClickHandler={() => {this.restart()}}>
            Restart
          </Button>
        </div>
        <hr/>
        <Link to="/">トップページへ</Link>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    quizInfo: state.quizInfo,
  };
};

const mapDispatchToProps = {
  fetchQuizzes
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Quiz);