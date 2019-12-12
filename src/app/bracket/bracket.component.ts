import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-bracket',
  templateUrl: './bracket.component.html',
  styleUrls: ['./bracket.component.css']
})
export class BracketComponent implements OnInit {

  round = [];
  rounds = [];

  data = {
    teams: [
      ['Team 1', 'Team 8'],
      ['Team 3', 'Team 6'],
      ['Team 4', 'Team 5'],
      ['Team 2', 'Team 7']
    ],
    results: [
      [
        [[1, 0], [2, 1], [1, 5], [2, 0]],
        [[5, 12], [1, 4]],
        [[1, 3]]
      ]
    ]
  };

  constructor() {
  }

  ngOnInit() {

    this.rounds = this.calcRounds(this.data.teams, this.data.results[0]);
    this.round = this.rounds;

  }

  calcRound(teams, round) {
    return teams.map((match, index) => {
      return {
        team1: {
          name: match[0],
          score: round[index][0],
          isWinner: round[index][0] > round[index][1]
        },
        team2: {
          name: match[1],
          score: round[index][1],
          isWinner: round[index][0] < round[index][1]
        }
      }
    });

  }

  calcRounds(teams, rounds) {
    const round = this.calcRound(teams, rounds[0])
    const teamsR2 = round.map(match => {
      return match.team1.isWinner ? match.team1 : match.team2;  // No ties
    }).reduce((acc, team) => {
      console.log('acc', acc)
      if (acc.length === 0) { 
        console.log(team.name)
        return [...acc, [team.name]];
      }
      if (acc[acc.length - 1].length === 1) {
        console.log('xxx', ...acc[acc.length - 1])
        return [...acc.slice(acc.length - 2), [...acc[acc.length - 1], team.name]];
      }
      return [...acc, [team.name]];

    }, []);
    console.log({teamsR2})
    // const round2 = this.calcRound(teams, rounds[1])
    // console.log({teamsR2, round2})
    return round
  }
}
