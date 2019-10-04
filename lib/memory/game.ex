defmodule Memory.Game do
    def new do
        %{
            # initial state
            content: shuffle(),
            completed: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            num_click: 0,
            first: -1,
            second: -1,
            btn_disabled: false,
        }
    end

    def client_view(game) do
        cpl = game.completed
        num = game.num_click
        %{
            # return state
            display: get_grid(game),
            message: get_message(cpl, num),
            btn_disabled: game.btn_disabled,
        }
    end

    def shuffle do
        # randomly deploy letters
        pool = ["A", "B", "C", "D", "E", "F", "G", "H", "A", "B", "C", "D", "E", "F", "G", "H"]
        Enum.shuffle(pool)
    end

    def get_grid(game) do
        # get displaying content of buttons
        cont = game.content
        cpl = game.completed
        my_map(cont, cpl)
    end

    def my_map([], []) do
        []
    end

    def my_map([cont_head|cont_tail], [comp_head|comp_tail]) do
        if comp_head == 0 do
            [" "|my_map(cont_tail, comp_tail)]
        else
            [cont_head|my_map(cont_tail, comp_tail)]
        end
    end

    def get_message(cpl, num) do
        # get game state message (playing / score)
        if Enum.any?(cpl, fn x -> x == 0 end) do
            "Playing...\ Clicks: "<>Integer.to_string(num)
        else
            "You won!\ Score: "<>Integer.to_string(div(2000, num))
        end
    end

    def on_click_letter(game, index) do
        # clicking letter buttons
        n = game.num_click
        cpl = game.completed

        n = n + 1
        cpl = List.replace_at(cpl, index, 1)

        # odd number of clicks
        if rem(n, 2) == 1 do
            IO.puts "odd"
            
            Map.merge(game, %{
                num_click: n,
                completed: cpl,
                first: index,
            })
        else
            IO.puts "even"
            match = do_match?(game,index)
            if match do
                Map.merge(game, %{
                    num_click: n,
                    completed: cpl,
                    first: -1,
                    second: -1,
                    btn_disabled: !match,
                })
            else
                Map.merge(game, %{
                    num_click: n,
                    completed: cpl,
                    second: index,
                    btn_disabled: !match,
                })
            end
        end 
    end

    def do_match?(game, index) do
        one = Enum.at(game.content, game.first)
        two = Enum.at(game.content, index)
        if one == two do
            true
        else
            false
        end
    end

    def clear(game) do
        disabled = game.btn_disabled
        IO.puts disabled
        if disabled do
            receive do
            after
                1_000 ->
                    clear_helper(game)
            end
        else
            game
        end
    end

    def clear_helper(game) do
        cpl = game.completed
        cpl = List.replace_at(cpl, game.first, 0)
        cpl = List.replace_at(cpl, game.second, 0)

        Map.merge(game, %{
            completed: cpl,
            btn_disabled: false,
            first: -1,
            second: -1,
        })
    end

    def on_click_restart(game) do
        # clicking restart
        Map.merge(game, %{
            content: shuffle(),
            completed: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            num_click: 0,
            first: -1,
            second: -1,
            btn_disabled: false,
        })
    end

end