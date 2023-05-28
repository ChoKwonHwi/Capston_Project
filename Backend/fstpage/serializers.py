from rest_framework import serializers

class PredictResultSerializer(serializers.Serializer):
    one_month_pred_height = serializers.FloatField()
    three_month_pred_height = serializers.FloatField()
    six_month_pred_height = serializers.FloatField()
    one_month_pred_weight = serializers.FloatField()
    three_month_pred_weight = serializers.FloatField()
    six_month_pred_weight = serializers.FloatField()
    graph_height = serializers.ListField(child=serializers.FloatField())
    graph_weight = serializers.ListField(child=serializers.FloatField())
    gender = serializers.FloatField()
    days = serializers.FloatField()
