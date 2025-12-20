const addMMRSheet = [
  {mmr:0, constants:40},
  {mmr:500, constants:40},
  {mmr:750, constants:35},
  {mmr:1000, constants:30},
  {mmr:1250, constants:25},
  {mmr:1500, constants:20},
  {mmr:1750, constants:15},
  {mmr:2000, constants:10},
  {mmr:2250, constants:5},
  {mmr:2500, constants:3},
  {mmr:2700, constants:2},
]

const subtractMMRSheet = [
  {mmr:0, constants:2},
  {mmr:500, constants:3},
  {mmr:750, constants:5},
  {mmr:1000, constants:10},
  {mmr:1250, constants:15},
  {mmr:1500, constants:20},
  {mmr:1750, constants:25},
  {mmr:2000, constants:30},
  {mmr:2250, constants:35},
  {mmr:2500, constants:40},
  {mmr:2700, constants:40},
]

// 증가 상수
function getAddConstant(mmr:number)
{
  let cur_mmr = addMMRSheet[0].mmr;
  let res:number = addMMRSheet[0].constants;
  
  addMMRSheet.forEach(item => {
    if(mmr >= item.mmr) {
      if(item.mmr >= cur_mmr) {
        cur_mmr = item.mmr;
        res = item.constants;
      }
    }
  });

  return res;
}

// 감소 상수
function getSubtractConstant(mmr:number)
{
  let cur_mmr = subtractMMRSheet[0].mmr;
  let res:number = subtractMMRSheet[0].constants;
  
  subtractMMRSheet.forEach(item => {
    if(mmr >= item.mmr) {
      if(item.mmr >= cur_mmr) {
        cur_mmr = item.mmr;
        res = item.constants;
      }
    }
  });

  return res;
}

// MMR 계산
export function AddMMR(my_mmr:number, my_team_sum:number, enemy_team_sum:number) {
  let addConst = getAddConstant(my_mmr);
  const add_mmr = Math.round(addConst * (enemy_team_sum/my_team_sum));

  // console.log("my MMR : " + my_mmr);
  // console.log("my_team_sum : " + my_team_sum);
  // console.log("enemy_team_sum : " + enemy_team_sum);
  // console.log("addConst : " + addConst);
  return add_mmr;
}

export function SubtractMMR(my_mmr:number, my_team_sum:number, enemy_team_sum:number) {
  let subConst = getSubtractConstant(my_mmr);
  const sub_mmr = Math.round(subConst * (my_team_sum/enemy_team_sum));

  // console.log("my MMR : " + my_mmr);
  // console.log("my_team_sum : " + my_team_sum);
  // console.log("enemy_team_sum : " + enemy_team_sum);
  // console.log("subConst : " + subConst);
  return -sub_mmr;
}