from django.shortcuts import render, redirect

# Create your views here.
def bb_dashboard(request):
    print("Getting Here..........")
    return render(request, 'BloodBank.html')