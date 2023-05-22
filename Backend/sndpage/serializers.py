from rest_framework import serializers

class ResultSerializer(serializers.Serializer):
    height_percent = serializers.FloatField()
    weight_percent = serializers.FloatField()
    plot_std_height = serializers.FloatField()
    plot_std_weight = serializers.FloatField()
    plot_data_mean_height = serializers.FloatField()
    plot_data_mean_weight = serializers.FloatField()
    height = serializers.FloatField()
    weight = serializers.FloatField()
    #gender = serializers.FloatField()
