var App = function(model) {
    this.model = model;

    this.get = function(params) {
        var self = this;

        return $.ajax({
            url: params.url,
            dataType: params.dataType,
            success: function(data) {
                self.model.setData(data);
            },
            error: function(xhr, error, exception) {
                console.log(error, exception);
            }
        });
    };
};

var Model = function () {
    this._data = null;
};

Model.prototype.setData = function(data) {
    this._data = data;
};

Model.prototype.getData = function() {
    return this._data;
};
