from django.db import models

class UserData(models.Model):
    height = models.FloatField() #키 
    weight = models.FloatField() #몸무게 
    gender = models.CharField(max_length=10) #성별
    days = models.FloatField() #일수
    
    #def __str__(self):
    #    return f'Height: {self.height}, Weight: {self.weight}, Gender: {self.gender}, Days: {self.days}'
