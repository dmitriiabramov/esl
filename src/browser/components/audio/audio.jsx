/** @jsx React.DOM */

var React = require('react');

var Audio = React.createClass({
    componentDidUpdate: function() {
        audiojs.createAll();
    },
    render: function() {
        var _this = this;

        // if link is not there yet or the id is different from what was there before
        // then make another request and get the link.
        if (!this.state || this.state.id !== this.props.item.id) {
            superagent.get('/s3/audios/' + this.props.item.id).end(function(error, res) {
                if (error) {
                    throw error;
                }

                _this.setState({
                    id: _this.props.item.id,
                    link: res.body.link
                });
            });

            return null;
        }

        var html = '<audio src=' + this.state.link + ' preload="auto" />';

        console.log(this.props.item);

        return (
            <div className="content pure-u-1 pure-u-md-3-4">
                <h1>{this.props.item.id}</h1>
                <div dangerouslySetInnerHTML={{__html: html}}></div>
                <pre>{this.props.item.text}</pre>
            </div>
        );
    }
});

module.exports = Audio;
