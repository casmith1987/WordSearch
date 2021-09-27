var findWords = function (board, words) {
  console.time('Solved In');
  const res = [],
    trie = {};

  for (let word of words) {
    let curNode = trie;
    for (let char of word) {
      curNode[char] = curNode[char] || {};
      curNode[char].count = curNode[char].count + 1 || 1;
      curNode = curNode[char];
    }
    curNode.end = word;
  }

  for (let row = 0; row < board.length; row++) {
    for (let col = 0; col < board[row].length; col++) {
      if (trie[board[row][col]]) traverse(row, col, [row, col]);
    }
  }

  console.timeEnd('Solved In');
  return res;

  function traverse(row, col, start, dir = 0, node = trie) {
    if (!board[row][col]) return;

    const char = board[row][col],
      curNode = node[char];
    if (!curNode) return;
    // console.log(curNode);

    if (curNode.end) {
      res.push([curNode.end, start, dir]);
      let toDelete = trie;
      for (let char of curNode.end) {
        toDelete[char].count--;
        if (!toDelete[char].count) {
          delete toDelete[char];
          break;
        }
        toDelete = toDelete[char];
      }
      delete curNode.end;
    }

    board[row][col] = 0;
    col - 1 >= 0 &&
      (!dir || dir === 'l') &&
      traverse(row, col - 1, start, 'l', curNode);

    col + 1 < board[row].length &&
      (!dir || dir === 'r') &&
      traverse(row, col + 1, start, 'r', curNode);

    row - 1 >= 0 &&
      (!dir || dir === 'u') &&
      traverse(row - 1, col, start, 'u', curNode);

    row + 1 < board.length &&
      (!dir || dir === 'd') &&
      traverse(row + 1, col, start, 'd', curNode);

    col + 1 < board[row].length &&
      row + 1 < board.length &&
      (!dir || dir === 'd2') &&
      traverse(row + 1, col + 1, start, 'd2', curNode);

    col + 1 < board[row].length &&
      row - 1 >= 0 &&
      (!dir || dir === 'd1') &&
      traverse(row - 1, col + 1, start, 'd1', curNode);

    row + 1 < board.length &&
      col - 1 >= 0 &&
      (!dir || dir === 'd3') &&
      traverse(row + 1, col - 1, start, 'd3', curNode);

    col - 1 >= 0 &&
      row - 1 >= 0 &&
      (!dir || dir === 'd4') &&
      traverse(row - 1, col - 1, start, 'd4', curNode);

    board[row][col] = char;
  }
};

console.log(
  findWords(
    [
      [...'otolvrzsfmcgbas'],
      [...'deeszqulxhlaaua'],
      [...'enecneicsizvnno'],
      [...'ravonrepuseidac'],
      [...'tlssoqtcgnvrahs'],
      [...'lptmivowoeoqgpy'],
      [...'tadotiqfrmioarz'],
      [...'rralaitselecmaq'],
      [...'iatorhednletmlh'],
      [...'nprgotapbigbang'],
      [...'uikylightyearth'],
      [...'tuaepocseletame'],
      [...'galaxysuscisyhp'],
      [...'sqxredshiftclkt'],
      [...'lqplhxvneaatysz'],
    ],
    [
      'andromeda',
      'earth',
      'moon',
      'space',
      'bigbang',
      'exploration',
      'physics',
      'star',
      'celestial',
      'galaxy',
      'planet',
      'supernova',
      'comet',
      'gammaray',
      'redshift',
      'telescope',
      'cosmology',
      'lightyear',
      'science',
      'universe',
    ]
  )
);

console.log(
  findWords(
    [
      [...'iprmevffahefmwa'],
      [...'tlbdisuqxetiasb'],
      [...'peysrsdtkssxrat'],
      [...'dizxtiqxoksumai'],
      [...'rtxpiiblleueoxl'],
      [...'xeltmhsgglqstmg'],
      [...'rsemarlinltsien'],
      [...'aortmsaniiatuiu'],
      [...'dmeadowlarkfqpu'],
      [...'trkeamtsxdrcsgg'],
      [...'qacqtmyhbnesoay'],
      [...'smatbaibuaesmmo'],
      [...'pamlwonnimmuoej'],
      [...'rizvitsakelomoe'],
      [...'ripyeknomewsbim'],
    ],
    [
      'mackerel',
      'marmoset',
      'minnow',
      'mosquito',
      'magpie',
      'marmot',
      'mockingbird',
      'moth',
      'manatee',
      'meadowlark',
      'mole',
      'mouse',
      'mandrill',
      'meerkat',
      'monkey',
      'mule',
      'marlin',
      'mink',
      'moose',
      'muskox',
    ]
  )
);
