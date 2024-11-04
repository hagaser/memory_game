<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Memory game</title>
  @vite("resources/css/index.css")
  @vite("resources/js/card-operations.js")
  @vite("resources/js/index.js")
  <?php

    function get_card_positions($number) {

      $cards = []; // list of unique cards

      $numberUniqCard = floor($number/2); // number Unique Cards
      $cols = ceil(sqrt($number));
      $rows = ceil($number/$cols);

      while(count($cards)<$numberUniqCard) { // filling an array with unique cards
        $rand = rand(1, 24);
        if(!in_array($rand,$cards))
          array_push($cards, $rand);
      }

      $cardList = array_merge($cards,$cards); // an array of all cards
      shuffle($cardList);
      return [$cols, $rows, $cardList];
    }

  ?>
</head>
<body>

  <!-- game block -->

  <div id="game-block" class="block">
    <?php

      if(isset($_GET["number"])) { // if the number is set

		    $number = $_GET["number"];

        if ($number < 2 or $number > 48) {
          echo '<p>Вы указали не верное колличество карточек</p>';
        } else {
		      [$cols, $rows, $cardList] = get_card_positions($number);
	      }

      }


      if (empty($cardList)) { // if the number of cards is not specified
        echo 
            '<h1>Игра на пямять</h1>'
          .'<p id="cards-number">Колличество карточек: 24 </p>'
          .'<form method="get">'
            .'<input type="range"
                     min="2"
                     max="48"
                     step="2"
                     value="24"
                     id="slider"
                     name="number"
                     >'
            .'<button type="submit">Играть</button>'
          .'</form>';
      }

      // == laying out cards ==

      else {
        for($ri=0; $ri<$rows; $ri++) { // for each row

          echo '<ul>';

          for($ci=0; $ci<$cols; $ci++) { // for each column

            $index = $ri*$cols+$ci; // calculates the place among the cards

            if(isset($cardList[$index]))

              echo 
                 '<li>'
                  .'<div class="place-holder">'
                    .'<div class="img-div">'
                      .'<img id="'.$cardList[$index].'" src="/img/'.$cardList[$index].'.jpg"/>'
                    .'</div>'
                  .'</div>'
                .'</li>';

            }
          
          echo '</ul>';
          
        };
      };
    ?>
  </div>

  <!-- win block -->

  <div id="win" class="block win">
    <h1>Вы победили!</h1>
    <a href="/"><p>на главную</p></a>
  </div>

</body>
</html>