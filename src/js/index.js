var _resultVeiculos;
var columns = {
    marca: 'Marca',
    veiculo: 'Modelo',
    ano: 'Ano',
    details: 'Detalhes',
}
var _seletedVeiculo;
var _selectedCheck = false;

$(document).ready(function() {

    $("#imgCheck").on('click', function () {
        if (_selectedCheck == false) {
            _seletedVeiculo.vendido = 1
            _selectedCheck = true
            $("#imgCheck").attr("src","/images/check-blue.png");
            $("#statusVeiculo").text("Vendido")
        } else {
            _seletedVeiculo.vendido = 0
            _selectedCheck = false
            $("#imgCheck").attr("src","/images/check.png");
            $("#statusVeiculo").text("À Venda");
        }
        
    })

    $("#addVeiculo").on('click', function() {
        var m = new Date();
        var dateString =
        m.getUTCFullYear() + "-" +
        ("0" + (m.getUTCMonth()+1)).slice(-2) + "-" +
        ("0" + m.getUTCDate()).slice(-2) + " " +
        ("0" + m.getUTCHours()).slice(-2) + ":" +
        ("0" + m.getUTCMinutes()).slice(-2) + ":" +
        ("0" + m.getUTCSeconds()).slice(-2); 

        var modelo = $("#infoModelo").val();
        var marca = $("#infoMarca").val();
        var ano = $("#infoAno").val();
        var descricao = $("#infoDescricao").val();
        var data = {
            "veiculo": modelo,
            "marca": marca,
            "ano": ano,
            "descricao": descricao,
            "vendido": 0,
            "created": dateString
        }
        $.ajax({
        cache: false,
        method: 'POST',
        data: JSON.stringify(data),
        url: 'http://localhost:5000/veiculos',
        contentType: "application/json",
        success: (function (e) {
            createDataGrid($('#listVeiculo'), 'listVeiculo-table', columns, e, null, null, 8)
        })
        })
    })

    $("#searchVeiculos").on('click', function() {
        // var search = $("#valueSearch").text("")
        // var status = $("#status").val();
        // var marca = $("#marca").val();
        // var decada = $("#decada").val()
        // var check = $('#selectCheckbox').is(":checked");


        const obj = {}
        var value = $("#valueSearch").val();
        var url = 'http://localhost:5000/veiculos';
        if (value != "") {
            url = url + value
        }

        $.ajax({
            cache: false,
            method: 'GET',
            url: url,
            contentType: "application/json",
            success: (function (e) {
                if (e.length == 0) {
                    alert('Não foi encontrado nenhum resultado')
                }

                $("#listVeiculo").empty();
                _resultVeiculos = e
                for (var i = 0; i < e.length; i++) {
                    var item = e[i];
                    item["details"] = '<img style="width: 20px;" src="/images/edit.png" onclick="detailsVeiculo(' + i + ')"/>'
                    
                }
                createDataGrid($('#listVeiculo'), 'listVeiculo-table', columns, e, null, null, 12)
            })
        })
    })

    $("#saveEditVeiculo").on('click', function() {

        var m = new Date();
        var dateString =
            m.getUTCFullYear() + "-" +
            ("0" + (m.getUTCMonth()+1)).slice(-2) + "-" +
            ("0" + m.getUTCDate()).slice(-2) + " " +
            ("0" + m.getUTCHours()).slice(-2) + ":" +
            ("0" + m.getUTCMinutes()).slice(-2) + ":" +
            ("0" + m.getUTCSeconds()).slice(-2);


        var data = {
            "veiculo": $("#info-veiculo").val(),
            "marca": $("#info-marca").val(),
            "ano": $("#info-ano").val(),
            "descricao": $("#info-descricao").val(),
            "vendido": _seletedVeiculo.vendido,
            "updated": dateString,
        }

        $.ajax({
            cache: false,
            method: 'PUT',
            data: JSON.stringify(data),
            url: 'http://localhost:5000/veiculos/' + _seletedVeiculo.carId,
            contentType: "application/json",
            success: (function (e) {
                _resultVeiculos = e
                alert("Veiculo atualizado com sucesso")
                // $("#navbarDetails").hide();
            }),
            error: (function (e) {
                
            })
        })
    })
   
    function createDataGrid(divContent, tableId, columns, rows, columnsWidth, className, limitCount, scope) {
    
        var $divContent = $(divContent);
        $divContent.addClass("wrapperTable");
        $divContent.append('<table id = "' + tableId + '">' + "<thead>" + "<tr></tr>" + "</thead>" + "<tbody> </tbody>" + "</table>");
        var divPaginate = $("#divPaginate-" + tableId);
        for (var i = 0; i < divPaginate.length; i++) {
            $(divPaginate[i]).remove();
        }
    
        $divContent.after('<div id="divPaginate-' + tableId + '" class="divPaginate"></div>');
    
        var table = $("#" + tableId);
        for (column in columns) {
            var count = columns[column];
            if (typeof scope !== "undefined") {
                count = getGlobalText(columns[column], scope);
                $("#" + tableId + " thead > tr").append(" <th translated-text='" + columns[column] + "'> " + count + "</th>");
            }
            else {
                $("#" + tableId + " thead > tr").append(" <th> " + count + "</th>");
            }
        }
    
        if (columnsWidth) {
            for (var i = 0; i < columnsWidth.length; i++) {
                $($(table).find("th")[i]).css("width", columnsWidth[i].value);
            }
        }
    
        if (rows) {
            for (var i = 0; i < rows.length; i++) {
                var $tr = $("<tr/>");
                $tr.data("index", i);
                $tr.appendTo("#" + tableId);
                for (column in columns) {
                    var isNotText = false;
                    if (rows[i][column] != null && rows[i][column] != undefined) {
                        isNotText = rows[i][column].toString().indexOf("/>") >= 0 || rows[i][column].toString().indexOf("</") >= 0;
                    
                        if (rows[i][column] instanceof jQuery)
                            isNotText = true;
                    }
                    var $td;
                    if (!isNotText) {
                        $td = $("<td/>", { class: className, title: rows[i][column] });
                    } else {
                        $td = $("<td/>", { class: className });
                    }
                
                    $td.append(rows[i][column]);
                    $tr.append($td);
                }
            }
        }

        if (!limitCount) {
            $("#" + tableId).paging({ limit: 10 });
        } else {
            $("#" + tableId).paging({ limit: limitCount });
        }
    }

    function getGlobalText(tag, name) {
        var globalText;
        globalText = _widgetsJson[name][_userLang][tag];
        return globalText;
    }
        
})


function insertValues() {
    $("#info-veiculo").val(_seletedVeiculo.veiculo);
    $("#info-marca").val(_seletedVeiculo.marca);
    $("#info-descricao").val(_seletedVeiculo.descricao);
    $("#info-ano").val(_seletedVeiculo.ano);
    $("#statusVeiculo").text("Vendido");
    $("#imgCheck").attr("src", "/images/check-blue.png");
    if (_seletedVeiculo.vendido == 0) {
        $("#statusVeiculo").text("À Venda");
        $("#imgCheck").attr("src", "/images/check.png");
    } 
}


function detailsVeiculo(value) {
    _seletedVeiculo = _resultVeiculos[value];
      $("#modelo").text(_seletedVeiculo.veiculo)
      $("#marca").text(_seletedVeiculo.marca)
      $("#anoVeiculo").text(_seletedVeiculo.ano)
      $("#comentario").text(_seletedVeiculo.descricao)
    }